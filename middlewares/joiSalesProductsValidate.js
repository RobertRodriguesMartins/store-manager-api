const Joi = require('joi');

const expected = Joi.object({
  productId: Joi.number().positive().required().messages({
    'any.required': '"productId" is required',
  }),
  quantity: Joi.number().min(1).required().messages({
    'any.required': '"quantity" is required',
    'number.min': '"quantity" must be greater than or equal to 1',
  }),
}).required();
const schemaParams = Joi.object({
  id: Joi.number().positive().required().messages({
    'joi.number': 'must be a number',
  }),
});

const joiSalesProductsValidator = async (req, _res, next) => {
  const { id: sale } = await schemaParams.validateAsync({ ...req.params });
  const schemaBody = Joi.array().items(expected).required().has(expected);
  const productSalesArray = await schemaBody.validateAsync(req.body);

  req.productSalesArray = productSalesArray;
  req.id = sale;

  next();
};

module.exports = joiSalesProductsValidator;
