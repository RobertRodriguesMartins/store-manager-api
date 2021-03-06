const productRouter = require('express').Router();
const productController = require('../controllers/productController');

productRouter.get('/products/search', productController.search);
productRouter.get('/products', productController.all);
productRouter.post('/products', productController.create);
productRouter.get('/products/:id', productController.byId);
productRouter.put('/products/:id', productController.update);
productRouter.delete('/products/:id', productController.erase);

module.exports = productRouter;
