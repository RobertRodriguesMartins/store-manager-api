const salesRouter = require('express').Router();
const salesController = require('../controllers/salesController');

salesRouter.post('/sales', salesController.create);

module.exports = salesRouter;
