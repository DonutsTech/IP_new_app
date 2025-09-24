import Joi from 'joi';

const authForget = Joi.object().keys({
  EMAIL: Joi.string().email().required(),
});

export default authForget;
