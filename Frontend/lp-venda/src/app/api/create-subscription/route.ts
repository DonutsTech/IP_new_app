import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(req: NextRequest) {
  try {
    const { priceId, customerEmail, name } = await req.json();

    if (!priceId || !customerEmail) {
      return NextResponse.json({ error: "priceId e customerEmail são obrigatórios." }, { status: 400 });
    }

    // console.log("Recebida requisição para criar assinatura:", { priceId, customerEmail, name });

    let customer;
    const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: customerEmail,
        name: name,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      customer: customer.id,
      success_url: `${req.headers.get("origin")}/acess?step=sucess`,
      cancel_url: `${req.headers.get("origin")}/acess?step=cancel`,
    });
    return NextResponse.json({ checkout_session_url: session.url });

  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro na API de subscrição:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Ocorreu um erro desconhecido." },
      { status: 500 }
    );
  }
}
