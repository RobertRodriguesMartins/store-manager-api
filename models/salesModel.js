const connection = require('../db/connection');

const salesModel = {
  create: async () => {
    const createSaleQuery = 'INSERT INTO StoreManager.sales(`date`) values (now());';
    const created = await connection.query(createSaleQuery);

    return created;
  },
  createUserSale: async (saleId, productId, quantity) => {
    const createUserSaleQuery = [
      'INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) values (?, ?, ?);',
    ];
    const created = await connection.query(createUserSaleQuery[0], [
      saleId,
      productId,
      quantity,
    ]);

    return created;
  },
};

module.exports = salesModel;
