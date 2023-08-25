const handleMongooseError = (error, data, next) => {
  error.staus = 400;
  next();
};

module.exports = handleMongooseError;
