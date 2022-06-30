const connection = require('../db/connection');

const productModel = {
  all: async () => {
    const findAllQuery = 'SELECT * FROM StoreManager.product;';
    const [data] = await connection.query(findAllQuery);

    return data;
  },
};

module.exports = productModel;
