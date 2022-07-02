const salesRouter = require('express').Router();
const salesController = require('../controllers/salesController');
const joiSalesProductsValidator = require('../middlewares/joiSalesProductsValidate');

salesRouter.get('/sales', salesController.all);
salesRouter.get('/sales/:id', salesController.byId);
salesRouter.post('/sales', salesController.create);
salesRouter.put(
  '/sales/:id',
  joiSalesProductsValidator,
  salesController.update,
);
salesRouter.delete('/sales/:id', salesController.erase);

module.exports = salesRouter;
