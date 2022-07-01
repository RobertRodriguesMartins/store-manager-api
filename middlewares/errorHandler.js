function checkJoiCases(err, res) {
  const { name } = Object.getPrototypeOf(err);
  if (name !== 'ValidationError') return false;
  switch (err.details[0].type) {
    case 'any.required':
      return res.status(400).json({
        message: err.message,
      });
    case 'string.min':
    case 'number.min':
      return res.status(422).json({
        message: err.message,
      });
    default:
      return res.status(500).json({ message: err.message });
  }
}

function errorHandler(err, _req, res, _next) {
  if (err.message === 'NotFoundError') {
    res.status(404).json({
      message: 'Product not found',
    });
    return;
  }
  const isJoiError = checkJoiCases(err, res);
  if (!isJoiError) {
    return res.status(500).json({ message: `${err.message}-- unknown error` });
  }
}

module.exports = errorHandler;
