import Joi from 'joi';

export const videoUpdate = Joi.object({
  NAME: Joi.string().required(),
});

export default videoUpdate;
