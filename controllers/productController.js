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
      name: Joi.string().min(5).required().messages({
        'string.min': '"name" length must be at least 5 characters long',
        'any.required': '"name" is required',
      }),
    }).required();
    const { name: product } = await schema.validateAsync({ ...req.body });
    const created = await productService.create(product);

    res.status(201).json(created);
  },
  update: async (req, res, _next) => {
    const schemaBody = Joi.object({
      name: Joi.string().min(5).required().messages({
        'string.min': '"name" length must be at least 5 characters long',
        'any.required': '"name" is required',
      }),
    }).required();
    const schemaParams = Joi.object({
      id: Joi.number().positive().integer().required(),
    }).required();
    const { name: product } = await schemaBody.validateAsync({ ...req.body });
    const { id } = await schemaParams.validateAsync({ ...req.params });
    const updated = await productService.update(id, product);

    res.status(200).json(updated);
  },
};

module.exports = productController;
