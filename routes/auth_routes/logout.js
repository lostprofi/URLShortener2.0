const express = require('express');
const User = require('../../dataBase/models');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const refreshToken = req.headers.cookie.slice(13);

    await User.findOneAndUpdate({ refreshSessions: { $elemMatch: { refreshToken } } },
      { $pull: { refreshSessions: { refreshToken } } });

    return res.status(200).send('ok');
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

module.exports = router;
