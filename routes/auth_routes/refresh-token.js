const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {

  const refreshToken = req.headers.cookie;
   
  return res.send(refreshToken);
});

module.exports = router;
