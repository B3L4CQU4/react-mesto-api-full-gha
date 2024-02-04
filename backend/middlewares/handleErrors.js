const handleErrors = (error, req, res, next) => {
  if (error.code === 11000) {
    const statusCode = 409; // Обработка ошибки бд
    const { message } = error;
    res.status(statusCode).json({ message });
  } else {
    // Другие ошибки
    const statusCode = error.statusCode || 500;
    const message = statusCode === 500 ? 'На сервере произошла ошибка' : error.message;
    res.status(statusCode).json({ message });
  }

  next();
};

module.exports = handleErrors;
