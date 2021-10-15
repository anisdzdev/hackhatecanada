const Joi = require('@hapi/joi');

const schemas = {
    valid_link: Joi.object().keys({
        url: Joi.string().required(),
    }),
};

module.exports = schemas;