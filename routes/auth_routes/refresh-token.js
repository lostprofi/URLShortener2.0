const express = require('express');
const config = require('config');
const { v4: uuid } = require('uuid');

const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../dataBase/models');

router.post('/', async (req, res) => {
  const refreshToken = req.headers.cookie.slice(13);
  const { fingerprint } = req.body;

  try {
    const decodedRefresh = jwt.verify(refreshToken, config.get('refreshTokenSecret'));

    const userId = decodedRefresh.id;

    const user = await User.findById(userId);

    const { refreshSessions } = user;

    const currentRefreshSession = refreshSessions.find((sess) => sess.refreshToken === refreshToken);

    const refSessExpIn = currentRefreshSession.expiresIn;

    // check refresh session expires time

    if (refSessExpIn < Date.now() / 1000) {
      return res.status(500).json({ errors: [{ msg: 'Auth error' }] });
    }

    const refreshSessFprnt = currentRefreshSession.fingerprint;

    // check fingerprint
    console.log(fingerprint);

    if (fingerprint !== refreshSessFprnt) {
      return res.status(500).json({ errors: [{ msg: 'Fingeprint error' }] });
    }

    // await User.findByIdAndUpdate(userId, { $pull: { refreshSessions: { refreshToken } } });

    // create new refresh token

    const newRefreshToken = jwt.sign(
      { id: user.id, key: uuid(), exp: Math.floor(Date.now() / 1000 + 5184000) },
      config.get('refreshTokenSecret'),
    );

    const newRefreshSession = {
      userId: user.id,
      refreshToken: newRefreshToken,
      fingerprint,
      expiresIn: Math.floor(Date.now() / 1000 + 5184000),
    };

    // create new accessToken

    const payload = {
      user: {
        id: user.id,
        role: 'user',
      },
      exp: Math.floor(Date.now() / 1000) + 60,
    };

    jwt.sign(payload,
      config.get('accessTokenSecret'),
      (err, token) => res.status(200).append(
        'Set-Cookie',
        `refreshToken=${newRefreshToken}; Path = /; HttpOnly`,
      ).json({ token, role: 'user' }),
      { algorithm: 'RS256' });

    await User.findByIdAndUpdate(userId, { $pull: { refreshSessions: { refreshToken } } });

    await User.findOneAndUpdate(userId, { $push: { refreshSessions: newRefreshSession } });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: 'Auth error' }] });
  }
});

module.exports = router;
