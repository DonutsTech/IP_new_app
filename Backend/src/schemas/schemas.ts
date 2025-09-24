import { ObjectSchema } from 'joi';

import authLogin from '../modules/auth/schema/login';
import authRegister from '../modules/auth/schema/register';
import authPaymentCheckout from '../modules/checkout/schema/paymentCheckout';
import authForget from '../modules/auth/schema/forget';
import authReset from '../modules/auth/schema/reset';
import videoCreate from '../modules/video/schema/videoCreate';
import videoUpdate from '../modules/video/schema/videoUpdate';

const schemas: { [key: string]: ObjectSchema } = {
  'auth/login': authLogin,
  'auth/register': authRegister,
  'auth/forget': authForget,
  'auth/reset': authReset,
  'checkout/payment': authPaymentCheckout,
  'video/create': videoCreate,
  'video/update': videoUpdate,
  'campaign/create': videoCreate,
};

export default schemas;
