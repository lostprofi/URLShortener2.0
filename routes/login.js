const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../dataBase/models');

const router = express.Router();

router.post(
  '/login',
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

      const { email, password } = req.body;

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

      const payload = {
        user: {
          id: user.id,
        },
      };


      jwt.sign(payload,
        config.get('tokenSecretKey'),
        (err, token) => res.json({ token }), { expiresIn: '1h', algorithm: 'RS256' });
    } catch (err) {
      return res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
  },
);

module.exports = router;
