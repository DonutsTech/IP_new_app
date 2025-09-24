import { planService } from '../modules/Plan/plan.service';
import { getStripeProducts } from '../utils/stripe';

export async function checkoutPlan() {
  try {
    const count = await planService.count();

    if (count === 0) {
      const products = await getStripeProducts();

      if (products.length > 0) {
        for (const product of products) {
          await planService.create(product);
        }
      }
    }
  } catch (error) {
    console.log('Error ao verificar a tabela de produtos');
  }
}
