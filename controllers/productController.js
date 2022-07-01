const Joi = require('joi');
const productService = require('../services/productService');

const productController = {
  all: async (_req, res, _next) => {
    const data = await productService.all();

    res.status(200).json(data);
  },
  byId: async (req, res, _next) => {
    const schema = Joi.object({
      id: Joi.number().positive().integer().required(),
    }).required();

    const { id } = await schema.validateAsync({ ...req.params });
    const data = await productService.byId(id);

    res.status(200).json(data);
  },
  create: async (req, res, _next) => {
    const schema = Joi.object({
      name: Joi.string().not('').required(),
    }).required();
    const { name: product } = await schema.validateAsync({ ...req.body });
    const created = await productService.create(product);

    res.status(201).json(created);
  },
};

module.exports = productController;
