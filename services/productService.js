const productModel = require('../models/productModel');
const NotFoundError = require('../utils/customErrors');

const productService = {
  emptyData: (data) => data.length < 1,
  all: async () => {
    const data = await productModel.all();
    if (productService.emptyData(data)) throw new NotFoundError('Product not found');

    return data;
  },
  byId: async (id) => {
    const data = await productModel.byId(id);
    if (productService.emptyData(data)) throw new NotFoundError('Product not found');

    const [result] = data;
    return result;
  },
  create: async (product) => {
    const created = await productModel.create(product);

    const [{ insertId }] = created;
    return {
      id: insertId,
      name: product,
    };
  },
  erase: async (product) => {
    await productService.byId(product);
    await productModel.erase(product);
  },
  update: async (id, product) => {
    await productService.byId(id);
    await productModel.update(id, product);

    return {
      id,
      name: product,
    };
  },
};

module.exports = productService;
