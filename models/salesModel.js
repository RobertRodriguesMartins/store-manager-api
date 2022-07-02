const connection = require('../db/connection');

const salesModel = {
  all: async () => {
    const findAllSalesQuery = `SELECT s.id saleId, s.date, sa.product_id productId,
      sa.quantity quantity
      FROM StoreManager.sales as s
      INNER JOIN StoreManager.sales_products AS sa
      ON sa.sale_id = s.id
      ORDER BY s.id ASC, sa.product_id ASC;`;

    const [data] = await connection.query(findAllSalesQuery);

    return data;
  },
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
