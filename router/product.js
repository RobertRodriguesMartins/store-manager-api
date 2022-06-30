const productRouter = require('express').Router();
const productController = require('../controllers/productsController');

productRouter.get('/products', productController.all);

module.exports = productRouter;
