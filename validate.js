const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const registerSchema = {
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, registerSchema);
};

const loginValidation = (data) => {
  const loginSchema = {
    email: Joi.string().min(6).required().max(255).email(),
    password: Joi.string().min(6).required(),
  };

  return Joi.validate(data, loginSchema);
};

module.exports = {
  registerValidation,
  loginValidation,
};
