import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'

/**
 * Refer to https://dashboard.stripe.com/test/webhooks
 * to see how to test the webhooks locally
 *
 */

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    return new NextResponse('Webhook Error', { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  // when the subscription is created
  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    if (!session.metadata?.orgId) {
      return new NextResponse('Org ID not found', { status: 400 })
    }

    await db.orgSubscription.create({
      data: {
        orgId: session.metadata.orgId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })
  }

  // when the subscription is renewed
  if (event.type === 'invoice.payment_succeeded') {
    const subscriptions = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await db.orgSubscription.update({
      where: {
        stripeSubscriptionId: subscriptions.id,
      },
      data: {
        stripePriceId: subscriptions.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscriptions.current_period_end * 1000
        ),
      },
    })
  }

  return new NextResponse(null, { status: 200 })
}
