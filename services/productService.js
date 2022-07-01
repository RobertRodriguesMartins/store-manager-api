const productModel = require('../models/productModel');

const productService = {
  emptyData: (data) => (data.length < 1),
  all: async () => {
    const data = await productModel.all();
    if (productService.emptyData(data)) throw new Error('NotFoundError');

    return data;
  },
  byId: async (id) => {
    const data = await productModel.byId(id);
    if (productService.emptyData(data)) throw new Error('NotFoundError');

    const [result] = data;
    return result;
  },
  create: async (product) => {
    const created = await productModel.create(product);

    return created;
  },
};

module.exports = productService;
