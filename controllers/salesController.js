const Joi = require('joi');
const salesService = require('../services/salesService');

const salesController = {
  all: async (_req, res, _next) => {
    const data = await salesService.all();

    res.status(200).json(data);
  },
  byId: async (req, res, _next) => {
    const expected = Joi.object({
      id: Joi.number().positive().required().messages({
        'joi.number': 'must be a number',
      }),
    });
    const { id } = await expected.validateAsync({ ...req.params });
    const data = await salesService.byId(id);

    res.status(200).json(data);
  },
  create: async (req, res, _next) => {
    const expected = Joi.object({
      productId: Joi.number().positive().required().messages({
        'any.required': '"productId" is required',
      }),
      quantity: Joi.number().min(1).required().messages({
        'any.required': '"quantity" is required',
        'number.min': '"quantity" must be greater than or equal to 1',
      }),
    }).required();
    const schema = Joi.array().items(expected).required().has(expected);
    const productSalesArray = await schema.validateAsync(req.body);

    await salesService.checkProduct(productSalesArray);
    const saleId = await salesService.createSale();

    const response = await salesService.createUserSale(
      saleId,
      productSalesArray,
    );
    res.status(201).json(response);
  },
  erase: async (req, res, _next) => {
    const schema = Joi.object({
      id: Joi.number().positive().required().messages({
        'joi.number': 'must be a number',
      }),
    });
    const { id: sale } = await schema.validateAsync({ ...req.params });

    await salesService.byId(sale);
    await salesService.erase(sale);

    res.status(204).end();
  },
};

module.exports = salesController;
