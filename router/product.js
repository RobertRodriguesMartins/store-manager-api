const productRouter = require('express').Router();
const productController = require('../controllers/productController');

productRouter.get('/products', productController.all);
productRouter.post('/products', productController.create);
productRouter.get('/products/:id', productController.byId);

module.exports = productRouter;
