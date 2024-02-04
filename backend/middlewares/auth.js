const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');

const { JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AuthError('Unauthorized: Token missing');
  }
  if (!authorization.startsWith('Bearer ')) {
    throw new AuthError('Unauthorized: Token missing');
  }
  const token = authorization.split('Bearer ')[1];
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    next(error);
  }
  req.user = payload;
  next();
};

module.exports = authMiddleware;
