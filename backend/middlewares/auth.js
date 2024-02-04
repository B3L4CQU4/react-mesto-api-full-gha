const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');
const InvalidToken = require('../errors/invalidToken');

const { JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Unauthorized: Token missing or incorrectly formatted');
  }
  const token = authorization.split('Bearer ')[1];
  let payload;
  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (error) {
    throw new InvalidToken('Unauthorized: Invalid Token');
  }
  req.user = payload;
  next();
};

module.exports = authMiddleware;
