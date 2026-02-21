import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Handle successful payment
    const { agentId, buyerId } = session.metadata!;
    
    // TODO: Update database with purchase record
    // TODO: Grant access to agent
    // TODO: Calculate and distribute earnings
    
    console.log('Payment successful:', { agentId, buyerId, sessionId: session.id });
  }

  return NextResponse.json({ received: true });
}