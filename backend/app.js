require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const authMiddleware = require('./middlewares/auth');
const handleErrors = require('./middlewares/handleErrors');
const handleJsonParseError = require('./middlewares/handleJsonParseError');
const NotFound = require('./errors/notFound');
const {
  validateCreateUser,
  validateLogin,
} = require('./validation/validation');
const { requestLogger, errorLogger } = require('./logger/logger');

const { PORT = 3000, DB_ADDRESS } = process.env;

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  process.env.NODE_ENV === 'production' ? DB_ADDRESS : 'mongodb://localhost:27017/mestodb',
  {
    autoIndex: true,
  },
);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use((req, res, next) => {
  requestLogger.info({
    method: req.method,
    url: req.url,
    query: req.query,
    body: req.body,
    ip: req.ip,
  });
  next();
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use((req, res, next) => {
  if (req.url === '/signin' || req.url === '/signup') {
    next(); // Пропустить authMiddleware для /signin и /signup
  } else {
    authMiddleware(req, res, next);
  }
});

app.use(userRouter);
app.use(cardRouter);

app.use(errors());

app.all('*', (req, res, next) => {
  next(new NotFound('Not Found'));
});

app.use((error, req, res, next) => {
  errorLogger.error({
    method: req.method,
    url: req.url,
    query: req.query,
    body: req.body,
    ip: req.ip,
    error: error.message,
  });
  handleErrors(error, req, res, next);
  next();
});

app.use(handleJsonParseError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
