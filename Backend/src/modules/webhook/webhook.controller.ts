import { NextFunction, Request, Response } from 'express';
import {
  handleCancelPlan,
  handleCheckoutSessionCompleted,
  handleInvoicePaid,
  handleInvoicePaymentFailed,
  handleSubscriptionSessionCompleted,
  stripe,
} from '../../utils/stripe';

class WebhookController {
  async webhook(request: Request, response: Response, next: NextFunction) {
    const signature = request.headers['stripe-signature'] as string;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string,
      );
    } catch (error) {
      response.status(400).send('Webhook Error');
      return;
    }

    switch (event.type) {
      case 'checkout.session.completed': // primeiro pagamento
        await handleCheckoutSessionCompleted(event);
        break;
      case 'customer.subscription.created': // sempre que uma nova assinatura é criada para um cliente na Stripe.
      case 'customer.subscription.updated':
        await handleSubscriptionSessionCompleted(event);
        break;
      case 'customer.subscription.deleted': // deleta o plano
        await handleCancelPlan(event);
        break;
      case 'invoice.paid': // cada ciclo de cobrança gera uma nova invoice
        await handleInvoicePaid(event);
        break;
      case 'invoice.payment_failed': // falha de pagamento
        await handleInvoicePaymentFailed(event);
        break;
      case 'product.created': //quando você cria um produto novo.
        break;
      case 'product.updated': //quando edita (ex: muda o nome de "Plano Básico" para "Essencial").
        break;
      case 'product.deleted': //se excluir o produto.
        break;
      case 'price.created': // quando cria um novo preço para um produto
        break;
      case 'price.updated': // quando muda algo no preço (ex: ativa/desativa).
        break;
      case 'price.deleted': // se excluir o preço.
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.send();
  }
}

export default WebhookController;
