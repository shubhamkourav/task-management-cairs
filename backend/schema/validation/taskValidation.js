const Joi = require('joi');

// Define a Joi schema for user creation
exports.createTask= Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(10).required(),
  user: Joi.string().required(),
})

exports.updateTask= Joi.object({
    title: Joi.string().required(),
    description: Joi.string().min(10).required(),
    user: Joi.string().required(),
})



