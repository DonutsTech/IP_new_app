import { NextFunction, Request, Response } from 'express';
import { PaymentCheckoutDTO } from './interface/paymentCheckout.dto';
import { checkoutService } from './checkout.service';

class CheckoutController {
  async createCheckout(request: Request, response: Response, next: NextFunction) {
    try {
      const { ID_PLAN, ID_USER }: PaymentCheckoutDTO = request.body;
      const create = await checkoutService.createCheckout({ ID_PLAN, ID_USER });
      return response.status(200).json(create);
    } catch (error) {
      next(error);
    }
  }

  async createPortal(request: Request, response: Response, next: NextFunction) {
    try {
      const { user } = request;
      const create = await checkoutService.createPortal(user.ID);
      return response.status(200).json(create);
    } catch (error) {
      next(error);
    }
  }
}

export default CheckoutController;
