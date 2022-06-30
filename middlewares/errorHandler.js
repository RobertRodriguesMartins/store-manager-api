function errorHandler(err, _req, res, _next) {
  res.status(500).json({ message: 'algo esta errado' });
}

module.exports = errorHandler;
