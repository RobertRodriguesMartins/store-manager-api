const salesModel = require('../models/salesModel');
const NotFoundError = require('../utils/customErrors');
const productService = require('./productService');

const salesService = {
  all: async () => {
    const data = await salesModel.all();

    return data;
  },
  byId: async (id) => {
    const data = await salesModel.byId(id);
    if (data.length < 1) throw new NotFoundError('Sale not found');

    return data;
  },
  checkProduct: async (productsSales) => {
    const products = salesService.mapProductId(productsSales);
    const checkProducts = [];
    products.forEach((productId) => {
      checkProducts.push(productService.byId(productId));
    });
    await Promise.all(checkProducts);
    return true;
  },
  createSale: async () => {
    const created = await salesModel.create();

    const [{ insertId }] = created;

    return insertId;
  },
  createUserSale: async (saleId, productsSales) => {
    const userSales = [];
    productsSales.forEach((product) => {
      const { productId, quantity } = product;
      userSales.push(salesModel.createUserSale(saleId, productId, quantity));
    });
    await Promise.all(userSales);
    return {
      id: saleId,
      itemsSold: productsSales,
    };
  },
  erase: async (sale) => {
    await salesModel.erase(sale);
  },
  mapProductId: (productsSales) =>
    productsSales.map((data) => Number(data.productId)),
};

module.exports = salesService;
