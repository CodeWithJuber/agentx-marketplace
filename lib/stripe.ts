import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeKey 
  ? new Stripe(stripeKey, { apiVersion: '2025-02-24.acacia' })
  : null as unknown as Stripe;

export async function createCheckoutSession({
  price,
  agentId,
  buyerId,
  successUrl,
  cancelUrl,
}: {
  price: number;
  agentId: string;
  buyerId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'AI Agent Purchase',
            description: 'One-time purchase of AI agent',
          },
          unit_amount: price * 100, // Convert to cents
        },
        quantity: 1,
      },
    ],
    metadata: {
      agentId,
      buyerId,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session;
}