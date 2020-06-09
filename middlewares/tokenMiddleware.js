const config = require('config');
const jwt = require('jsonwebtoken');

const tokenMdlware = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ errors: [{ msg: 'No token, authorization denied' }] });
  }

  try {
    const tokenPayload = jwt.verify(token, config.get('accessTokenSecret'), (err, decoded) => decoded);

    req.user = tokenPayload.user;

    next();
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: 'invalid token' }] });
  }
};

module.exports = tokenMdlware;
