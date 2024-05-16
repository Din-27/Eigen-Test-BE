const Joi = require('joi');

exports.PinjamSchema = Joi.object({
    codeMember: Joi.string().required(),
    codeBook: Joi.string().required(),
})

exports.KembalikanSchema = Joi.object({
    id: Joi.string().required()
})