import Joi from 'joi';

const authReset = Joi.object().keys({
  HASHED_PASSWORD: Joi.string().required(),
  CODE: Joi.string().required(),
});

export default authReset;
