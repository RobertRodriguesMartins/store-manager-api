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
    const created = await connection.query(createProductQuery, [product]);

    return created;
  },
  erase: async (product) => {
    const deleteProductQuery = 'DELETE FROM StoreManager.products WHERE id = ?;';
    await connection.query(deleteProductQuery, [product]);
  },
  search: async (product) => {
    const searchProductQuery = `SELECT * FROM StoreManager.products
    WHERE name LIKE CONCAT(?, '%');`;
    const [data] = await connection.query(searchProductQuery, [product]);

    return data;
  },
  update: async (id, product) => {
    const updateProductQuery = `UPDATE StoreManager.products
    SET name = ? WHERE id = ?;`;
    const updated = await connection.query(updateProductQuery, [product, id]);

    return updated;
  },
};

module.exports = productModel;
