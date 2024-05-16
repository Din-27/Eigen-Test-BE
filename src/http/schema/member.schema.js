const Joi = require('joi');

exports.MemberSchema = Joi.object({
    name: Joi.string().required()
})