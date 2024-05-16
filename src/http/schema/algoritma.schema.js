const Joi = require('joi');

exports.CharsSchema = Joi.object({
    chars: Joi.string()
        .required()
})

exports.FamousShowingSchema = Joi.object({
    input: Joi.array()
        .required(),
    query: Joi.array()
        .required()
})

exports.MatrixSchema = Joi.object({
    matrix: Joi.array()
        .required(),
})

