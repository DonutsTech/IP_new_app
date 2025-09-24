import { Router } from 'express';
import schemaValidator from '../../middlewares/schemaValidator';
import CheckoutController from './checkout.controller';
import { isAuthenticateToken } from '../../middlewares/isAuthenticateToken';

class CheckoutRouter {
  public static create(router: Router): void {
    const endpoint = new CheckoutController();

    router.post('/create-checkout', schemaValidator('checkout/payment'), endpoint.createCheckout);

    router.get('/create-portal', isAuthenticateToken, endpoint.createPortal);
  }
}

export { CheckoutRouter };
