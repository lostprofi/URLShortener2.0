const express = require('express');

const authRouter = express.Router();

authRouter.use('/login', require('./auth_routes/login'));

authRouter.use('/logout', require('./auth_routes/logout'));

authRouter.use('/refresh-token', require('./auth_routes/refresh-token'));

module.exports = authRouter;
