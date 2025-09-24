import Joi from 'joi';

export const videoCreate = Joi.object({
  NAME: Joi.string().required(),
  SIZE: Joi.number().integer().required(),
  FORMAT: Joi.string().required(),
  DURATION: Joi.number().integer().required(),
  ORIENTATION: Joi.string().valid('portrait', 'landscape', 'square').required(),
  HEIGHT: Joi.number().integer().required(),
  WIDTH: Joi.number().integer().required(),
});

export default videoCreate;
