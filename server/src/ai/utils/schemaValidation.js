const Joi = require('@hapi/joi');

const schemas = {
    valid_link: Joi.object().keys({
        url: Joi.string().required(),
    }).unknown(true),
};

module.exports = schemas;