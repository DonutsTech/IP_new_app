import Stripe from 'stripe';
import { userService } from '../modules/user/user.service';
import { planService } from '../modules/Plan/plan.service';
import { AppError } from '../erros';
import { Plan } from '@prisma/client';
import { historyPlaysService } from '../modules/historyPlays/historyPlays.service';

export const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  httpClient: Stripe.createFetchHttpClient(),
});

export const getStripeProducts = async () => {
  const { data } = await stripe.products.list({ limit: 100 });
  const plan = await Promise.all(
    data.map(async (item) => {
      let planItem: any = {
        PLAN: item.name,
        STRIPE_PLAN_ID: item.id,
        STRIPE_PLAN_PRICE: item.default_price,
        ...(item.metadata || {}),
      };

      return planItem;
    }),
  );
  return plan.map(
    ({
      PLAN,
      STRIPE_PLAN_ID,
      STRIPE_PLAN_PRICE,
      PLAYS,
      PLAYS_PRICE,
      PRICE,
      STATUS,
      VIDEO_LIMIT,
    }) => ({
      PLAN,
      PLAYS: Number(PLAYS),
      PLAYS_PRICE: Number(PLAYS_PRICE),
      PRICE: Number(PRICE),
      VIDEO_LIMIT: Number(VIDEO_LIMIT),
      STRIPE_PLAN_ID,
      STRIPE_PLAN_PRICE,
      STATUS: STATUS === 'true' ? true : false,
    }),
  );
};

export const getStripeCustomerByEmail = async (email: string) => {
  const custumers = await stripe.customers.list({ email });
  return custumers.data[0];
};

export const createStripeCustomer = async (data: { email: string; name?: string }) => {
  try {
    const custumer = await getStripeCustomerByEmail(data.email);
    let plan: Plan | null = null;
    if (custumer) {
      const subscription = await stripe.subscriptions.list({
        customer: custumer.id,
        status: 'all',
        limit: 1,
      });

      const subscriptionData = subscription.data[0];

      if (subscriptionData && subscriptionData.items && subscriptionData.items.data.length > 0) {
        const plans = await planService.plans({});

        const plansFilter = plans.filter(({ PLAN, STRIPE_PLAN_ID }) =>
          subscriptionData.status === 'trialing'
            ? PLAN === '14 dias Grátis'
            : STRIPE_PLAN_ID === subscriptionData.items.data[0].price.product,
        );

        plan = plansFilter[0];
      }

      if (subscription.data.length) {
        return {
          STRIPE_CUSTOMER_ID: custumer.id,
          STRIPE_SUBSCRIPTON_ID: subscriptionData.id,
          STRIPE_SUBSCRIPTON_STATUS: subscriptionData.status,
          ACTIVE: subscriptionData.status === 'active' || subscriptionData.status === 'trialing',
          ...(plan ? { PLAN: { connect: { ID: plan.ID } } } : {}),
          ...(plan ? { HISTORY_PLAYS: { create: { QTD_PLAYS: 0, PRICE_MONTH: 0 } } } : {}),
        };
      }
    }

    const custmors = await stripe.customers.create({
      email: data.email,
      name: data.name,
    });

    return {
      STRIPE_CUSTOMER_ID: custmors.id,
      STRIPE_SUBSCRIPTON_ID: '',
      STRIPE_SUBSCRIPTON_STATUS: '',
      ACTIVE: false,
    };
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
  }
};

export const generateCheckout = async (
  userId: string,
  email: string,
  planId: string,
  free: boolean,
  price: string,
  token: string,
) => {
  try {
    const customer = await getStripeCustomerByEmail(email);
    if (!customer) {
      throw new AppError(
        'Não conseguimos completar sua ação. Tente fazer login com uma conta diferente',
        400,
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      client_reference_id: userId,
      customer: customer.id,
      success_url: `http://localhost:3000/acess?payment=done&&token=${token}`,
      cancel_url: `http://localhost:3000/acess?payment=deny&&token=${userId}`,
      line_items: [
        {
          price: price,
          quantity: 1,
        },
      ],
      subscription_data: {
        ...(free ? { trial_period_days: 14 } : {}),
        metadata: {
          userId: userId,
          planId: planId,
          price: price,
        },
      },
    });

    return {
      URL: session.url,
    };
  } catch (error) {
    console.log('errr', error);
  }
};

export const handleCheckoutSessionCompleted = async (event: {
  data: { object: Stripe.Checkout.Session };
}) => {
  const idUser = event.data.object.client_reference_id as string;
  const stripeSubscriptionId = event.data.object.subscription as string;
  const stripeCustumerId = event.data.object.customer as string;
  const checkoutStatus = event.data.object.status;

  if (event.data.object.metadata && event.data.object.metadata.planId) {
    const planId = event.data.object.metadata.planId;

    if (checkoutStatus !== 'complete') return;

    if (!idUser || !stripeSubscriptionId || !stripeCustumerId) {
      throw new Error('idUser, stripeSubscriptionId, stripeCustumerId is required');
    }

    const userExist = await userService.showId(idUser);

    if (!userExist) {
      throw new Error('user not found');
    }

    await userService.update(idUser, {
      ACTIVE: true,
      STRIPE_CUSTOMER_ID: stripeCustumerId,
      STRIPE_SUBSCRIPTON_ID: stripeSubscriptionId,
      STRIPE_SUBSCRIPTON_STATUS: checkoutStatus,
      PLAN_ID: planId,
    });
  }
};

export const handleSubscriptionSessionCompleted = async (event: {
  data: { object: Stripe.Subscription };
}) => {
  const subscriptionStatus = event.data.object.status;
  const stripeCustumerId = event.data.object.customer as string;
  const stripeSubscriptionId = event.data.object.id as string;
  const stripePriceId = event.data.object.items.data[0].price.id;

  const userExist = await userService.user({ STRIPE_CUSTOMER_ID: stripeCustumerId });

  if (!userExist) {
    throw new Error('user stripeCustumerId not found');
  }

  const plan = (await planService.plans({ where: { STRIPE_PLAN_PRICE: stripePriceId } })).filter(
    ({ PLAN }) => !(PLAN === '14 dias Grátis'),
  )[0];

  const isActive = subscriptionStatus === 'active' || subscriptionStatus === 'trialing';

  await userService.update(userExist.ID, {
    ACTIVE: isActive,
    STRIPE_CUSTOMER_ID: stripeCustumerId,
    STRIPE_SUBSCRIPTON_ID: stripeSubscriptionId,
    STRIPE_SUBSCRIPTON_STATUS: subscriptionStatus,
    PLAN_ID: plan.ID,
  });
};

export const handleCancelPlan = async (event: { data: { object: Stripe.Subscription } }) => {
  const stripeCustumerId = event.data.object.customer as string;
  const subscriptionStatus = event.data.object.status;

  const userExist = await userService.user({ STRIPE_CUSTOMER_ID: stripeCustumerId });

  if (!userExist) {
    throw new Error('user stripeCustumerId not found');
  }

  await userService.update(userExist.ID, {
    ACTIVE: false,
    STRIPE_CUSTOMER_ID: stripeCustumerId,
    STRIPE_SUBSCRIPTON_STATUS: subscriptionStatus,
  });
};

export const handleInvoicePaid = async (event: { data: { object: Stripe.Invoice } }) => {
  const invoice = event.data.object;
  const customerId = invoice.customer as string;

  if ((invoice as any).subscription) {
    const userExist = await userService.user({ STRIPE_CUSTOMER_ID: customerId });

    if (!userExist) {
      throw new AppError('user stripeCustumerId not found');
    }

    const historyPlays = await historyPlaysService.historyPlays({
      where: { USER_ID: userExist.ID },
    });

    if (!historyPlays || historyPlays.length === 0) {
      const createHistory = await historyPlaysService.create({
        QTD_PLAYS: 0,
        PRICE_MONTH: 0,
        USER_ID: userExist.ID,
      });
      return createHistory;
    }

    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const historyPlaysThisMonth = await historyPlaysService.historyPlays({
      where: {
        USER_ID: userExist.ID,
        CREATED_AT: {
          gte: firstDay,
          lt: firstDayNextMonth,
        },
      },
    });

    if (historyPlaysThisMonth[0].STATUS === 'ativo') {
      return;
    }

    const firstDayPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const firstDayCurrentMonthAgain = new Date(now.getFullYear(), now.getMonth(), 1);

    const historyMoth = await historyPlaysService.historyPlays({
      where: {
        ID: historyPlays[0].ID,
        CREATED_AT: {
          gte: firstDayPreviousMonth,
          lt: firstDayCurrentMonthAgain,
        },
      },
    });

    if (historyMoth.length === 1) {
      const plan = await planService.showId(userExist.PLAN_ID as string);

      if (plan && historyMoth && plan.PLAYS < historyMoth[0].QTD_PLAYS) {
        const diferenca = historyMoth[0].QTD_PLAYS - plan.PLAYS;
        const value = Math.floor(diferenca * plan.PLAYS_PRICE * 100) / 100;

        await stripe.invoiceItems.create({
          customer: customerId,
          amount: value,
          currency: 'brl',
          description: `Cobrança por excesso de ${diferenca} plays do plano ${plan.PLAN}`,
        });

        const invoice = await stripe.invoices.create({
          customer: customerId,
          auto_advance: true,
        });

        if (!invoice.id) {
          throw new Error('Fatura inválida: id não definido');
        }

        const paidInvoice = await stripe.invoices.pay(invoice.id);

        if (paidInvoice.status === 'paid') {
          await historyPlaysService.update(historyPlaysThisMonth[0].ID, {
            STATUS: 'pago',
            PRICE_MONTH: value,
          });

          await userService.update(userExist.ID, { ACTIVE: true });

          await historyPlaysService.create({
            QTD_PLAYS: 0,
            PRICE_MONTH: 0,
            USER_ID: userExist.ID,
          });
        } else {
          await historyPlaysService.update(historyPlaysThisMonth[0].ID, {
            STATUS: 'pendente',
            PRICE_MONTH: value,
          });

          await userService.update(userExist.ID, { ACTIVE: false });
        }
      }
    }
  }
};

export const handleInvoicePaymentFailed = async (event: { data: { object: Stripe.Invoice } }) => {
  const invoice = event.data.object;
  const customerId = invoice.customer as string;

  const user = await userService.user({ STRIPE_CUSTOMER_ID: customerId });

  if (user) {
    await userService.update(user.ID, { ACTIVE: false });
  }
};

export const handleCancelSubscription = async (idSubscriptions: string) => {
  const subscription = await stripe.subscriptions.update(idSubscriptions, {
    cancel_at_period_end: true,
  });

  return subscription;
};

export const createPortalCustomer = async (idCustomer: string) => {
  const subscription = await stripe.billingPortal.sessions.create({
    customer: idCustomer,
    return_url: 'http://localhost:3000/acess',
  });

  return subscription.url;
};
