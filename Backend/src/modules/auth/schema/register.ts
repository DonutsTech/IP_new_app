import Joi from 'joi';

const authRegister = Joi.object().keys({
  EMAIL: Joi.string().email().required(),
  HASHED_PASSWORD: Joi.string().required(),
  NAME: Joi.string().min(2).max(100).required(),
  PHONE: Joi.string().min(10).max(15).required(),
});

export default authRegister;
