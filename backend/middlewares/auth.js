const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');

const { SECRET_KEY } = process.env;

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization.startsWith('Bearer ')) {
    throw new AuthError('Unauthorized: Token missing');
  }
  const token = authorization.split('Bearer ')[1];
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    next(error);
  }
  req.user = payload;
  next();
};

module.exports = authMiddleware;
