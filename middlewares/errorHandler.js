function errorHandler(err, _req, res, _next) {
  switch (err.message) {
    case 'NotFoundError':
      res.status(404).json({
        message: 'Product not found',
      });
      return;
    case '"name" is required':
      res.status(400).json({
        message: err.message,
      });
      return;
    case '"name" length must be at least 5 characters long':
      res.status(422).json({
        message: err.message,
      });
      return;
    default:
      res.status(500).json({ message: err.message });
  }
}

module.exports = errorHandler;
