const productModel = require('../models/productModel');

const productService = {
  all: async () => {
    const data = await productModel.all();

    return data;
  },
};

module.exports = productService;
