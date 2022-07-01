const connection = require('../db/connection');

const productModel = {
  all: async () => {
    const findAllQuery = 'SELECT * FROM StoreManager.products;';
    const [data] = await connection.query(findAllQuery);

    return data;
  },
  byId: async (id) => {
    const findByIdQuery = 'SELECT * FROM StoreManager.products WHERE id = ?;';
    const [data] = await connection.query(findByIdQuery, [id]);

    return data;
  },
  create: async (product) => {
    const createProductQuery = 'INSERT INTO StoreManager.products(name) VALUES (?);';
    const [created] = await connection.query(createProductQuery, [product]);

    return created;
  },
};

module.exports = productModel;
