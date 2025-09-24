import Joi from 'joi';

export const createCampaign = Joi.object({
  NAME: Joi.string().min(2).max(100).required(),
  VIDEOS: Joi.array()
    .items(
      Joi.object({
        VIDEO_ID: Joi.string().required(),
        ORDER: Joi.number().min(1).required(),
        BONDS: Joi.array()
          .items(
            Joi.object({
              VIDEO_ID: Joi.string().required(),
              BUTTON: Joi.boolean(),
              BUTTON_TEXT: Joi.string().max(200),
              BUTTON_STYLE: Joi.string(),
              BUTTON_START: Joi.number().min(0),
            }),
          )
          .required(),
      }),
    )
    .required(),
});

export default createCampaign;
