const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { v4: uuid } = require('uuid');

const User = require('../../dataBase/models');

const router = express.Router();

router.post(
  '/',
  [
    check('email', 'Please enter correct email').isEmail(),
    check('password', 'Please enter password with 6 or more symbols').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, fingerprint } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(406)
          .json({ errors: [{ msg: 'User is not registered' }] });
      }

      const isEqlPwd = await bcrypt.compare(password, user.password);

      if (!isEqlPwd) {
        return res.status(406).json({ error: [{ msg: 'Incorrect password' }] });
      }

      const refreshToken = jwt.sign(
        { id: user.id, key: uuid() },
        config.get('refreshTokenSecret'), { expiresIn: '60 days' },
      );

      const date = new Date();
      const currentTime = date.getTime();

      const refreshSession = {
        userId: user.id,
        refreshToken,
        fingerprint,
        expiresIn: currentTime + 3600000,
      };

      if (user.refreshSessions.length > 5) {
        await User.findOneAndUpdate({ email }, { $pull: { refreshSessions: { userId: `${user.id}` } } },
          { multi: true });
      }

      await User.findOneAndUpdate({ email }, { $push: { refreshSessions: refreshSession } });

      const payload = {
        user: {
          id: user.id,
          role: 'user',
        },
      };

      jwt.sign(payload,
        config.get('accessTokenSecret'),
        (err, token) => res.append(
          'Set-Cookie',
          `refreshToken=${refreshToken}; PATH={ domain: 'localhost: 5000', path: '/auth'}; HttpOnly`,
        ).json({ token }),
        { expiresIn: '0.5h', algorithm: 'RS256' });
    } catch (err) {
      return res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
  },
);

module.exports = router;
