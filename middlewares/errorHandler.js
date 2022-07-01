function errorHandler(err, _req, res, _next) {
  switch (err.message) {
    case 'ValidationError':
      res.status(400).json({
        message: 'bad request',
      });
      return;
    case 'NotFoundError':
      res.status(404).json({
        message: 'Product not found',
      });
      return;
    default:
      res.status(500).json({ message: err.message });
  }
}

module.exports = errorHandler;
