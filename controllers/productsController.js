const productService = require('../services/productService');

const productController = {
  all: async (_req, res, _next) => {
    const data = await productService.all();

    res.status(200).json(data);
  },
};

module.exports = productController;
