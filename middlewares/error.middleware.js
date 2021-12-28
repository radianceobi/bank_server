const errorHandler = (error, req, res, next) => {
  if (error) {
    res.status(500).json(error);
  }
};

module.exports = errorHandler;
