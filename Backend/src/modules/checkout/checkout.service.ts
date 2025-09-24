import { AppError } from '../../erros';
import { createPortalCustomer, generateCheckout } from '../../utils/stripe';
import { authService } from '../auth/auth.service';
import { mailService } from '../mail/mail.service';
import { planService } from '../Plan/plan.service';
import { userService } from '../user/user.service';
import { PaymentCheckoutDTO } from './interface/paymentCheckout.dto';

class CheckoutService {
  async createCheckout(data: PaymentCheckoutDTO) {
    try {
      const plan = await planService.showId(data.ID_PLAN);

      const user = await userService.showId(data.ID_USER);

      if (!user) {
        throw new AppError('Não conseguimos completar sua ação. Tente outra vez', 400);
      }

      if (!plan) {
        throw new AppError('Não conseguimos completar sua ação. Tente outra vez', 400);
      }

      const token = authService.createToken(user);

      await userService.update(user.ID, { HASHED_TOKEN: token });

      const stripe = await generateCheckout(
        user.ID,
        user.EMAIL,
        plan.ID,
        plan.PLAN === '14 dias Grátis',
        plan.STRIPE_PLAN_PRICE,
        token,
      );

      if (!stripe) {
        throw new AppError('Não conseguimos completar sua ação. Tente outra vez', 400);
      }

      mailService.sendValidateEmail(user.EMAIL, token);

      return stripe;
    } catch (error) {
      throw error;
    }
  }

  async createPortal(id: string) {
    try {
      const user = await userService.showId(id);

      if (!user) {
        throw new AppError('Não conseguimos completar sua ação. Tente outra vez', 400);
      }

      if (!user.STRIPE_CUSTOMER_ID) {
        throw new AppError('Não conseguimos completar sua ação. Tente outra vez', 400);
      }

      const portal = await createPortalCustomer(user.STRIPE_CUSTOMER_ID as string);

      return { URL: portal };
    } catch (error) {
      throw error;
    }
  }
}

export const checkoutService = new CheckoutService();
