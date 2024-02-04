const winston = require('winston');

const { format } = winston;

// Логгер для запросов
const requestLogger = winston.createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
});

// Логгер для ошибок
const errorLogger = winston.createLogger({
  level: 'error',
  format: format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
});

module.exports = {
  requestLogger,
  errorLogger,
};
