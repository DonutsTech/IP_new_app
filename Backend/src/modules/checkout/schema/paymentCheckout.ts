import Joi from 'joi';

const authPaymentCheckout = Joi.object().keys({
  ID_USER: Joi.string().required(),
  ID_PLAN: Joi.string().required(),
});

export default authPaymentCheckout;
