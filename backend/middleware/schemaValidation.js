const Joi = require('joi');

// Middleware function that takes a Joi schema and validates the request body
function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ error: error.details.map(({ path, message }) => { return { [path[0]]: message } }) });
        }
        next();
    };
}

module.exports = validate;
