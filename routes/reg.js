const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../dataBase/models');

const router = express.Router();

router.post('/reg', [
  check('username', 'Please enter your name').not().isEmpty(),
  check('email', 'Please enter correct e-mail adress').isEmail(),
  check('password', 'Please enter password with 6 or more symbols').isLength({ min: 6 }),
  check('passwordConfirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation is incorrect');
    } else {
      return true;
    }
  }),
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }

  const {
    username, email, password,
  } = req.body;

  try {
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(500).json({ errors: [{ msg: 'User is already exist' }] });
    }

    const hashPassword = await bcrypt.hash(`${password}`, 10);

    const user = new User({
      username,
      email,
      password: hashPassword,
      links: [],
      tags: [],
      description: '',
      refreshSessions: [],
    });

    await user.save();
    return res.status(201).send('User successfully registered ');
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

module.exports = router;
