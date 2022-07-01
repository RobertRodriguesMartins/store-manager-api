const salesModel = require('../models/salesModel');
const productService = require('./productService');

const salesService = {
  mapProductId: (productsSales) =>
    productsSales.map((data) => Number(data.productId)),
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
};

module.exports = salesService;
