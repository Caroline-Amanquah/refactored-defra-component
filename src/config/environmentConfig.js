'use strict';

const Joi = require('joi');

const environmentSchema = Joi.object({
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().valid('development', 'production', 'local').required(),
});

const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
};

const { error, value } = environmentSchema.validate(config);

if (error) {
  throw new Error(`The environment config is invalid: ${error.message}`);
}

module.exports = value;
