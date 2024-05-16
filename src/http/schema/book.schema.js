const Joi = require('joi');

exports.BookSchema = Joi.object({
    code: Joi.string().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    stock: Joi.number().required()
})