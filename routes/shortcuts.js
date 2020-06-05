const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../dataBase/models');
const randomStr = require('../utils/randomStr');

const router = express.Router();

// greate new shorten url

router.post('/', [
  check('fullURL', 'Please enter valid URL adress').isURL(),
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullURL } = req.body;
    const { id } = req.user;

    const user = await User.findById(id);

    const isExistURLDataObj = user.links.find((obj) => obj.fullURL === fullURL);

    if (isExistURLDataObj) {
      return res.status(200).json(isExistURLDataObj);
    }

    const shortStr = randomStr(4);

    const shortenURL = `http://localhost:5000/shortcuts/${shortStr}`;

    const URLDataObj = {
      fullURL,
      shortenURL,
      description: '',
      tags: [],
    };

    await User.findByIdAndUpdate(id, { $push: { links: URLDataObj } });

    res.status(201).json(URLDataObj);
  } catch (err) {
    res.status(400).json({ errors: [{ msg: 'Server error' }] });
  }
});

module.exports = router;
