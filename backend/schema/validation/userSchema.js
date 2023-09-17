const Joi = require('joi');

// Define a Joi schema for user creation
exports.createUser= Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
})

exports.updateUser= Joi.object({
  name: Joi.string().required(),
})



