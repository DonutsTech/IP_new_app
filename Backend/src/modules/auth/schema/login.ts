import Joi from 'joi';

const authLogin = Joi.object().keys({
  EMAIL: Joi.string().email().required(),
  HASHED_PASSWORD: Joi.string().required(),
});

export default authLogin;
