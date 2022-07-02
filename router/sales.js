const salesRouter = require('express').Router();
const salesController = require('../controllers/salesController');

salesRouter.get('/sales', salesController.all);
salesRouter.get('/sales/:id', salesController.byId);
salesRouter.post('/sales', salesController.create);
salesRouter.delete('/sales/:id', salesController.erase);

module.exports = salesRouter;
