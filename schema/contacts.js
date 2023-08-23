const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "name field is required",
    "any.required": "missing required name field",
  }),
  email: Joi.string().trim().pattern(/@/).required().messages({
    "string.empty": "email field is required",
    "any.required": "missing required email field",
  }),
  phone: Joi.string().trim().required().messages({
    "string.empty": "phone field is required",
    "any.required": "missing required phone field",
  }),
});

module.exports = contactsSchema;
