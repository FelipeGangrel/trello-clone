'use server'

import { auth, currentUser } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { frontend, prependAppUrl } from '@/lib/routes'
import { stripe } from '@/lib/stripe'

import { StripeRedirect } from './schema'
import { ReturnType } from './types'

const handler = async (): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  const user = await currentUser()

  if (!userId || !orgId || !user) {
    return {
      errorMessage: 'Unauthorized',
    }
  }

  const orgUrl = prependAppUrl(frontend.organization(orgId))

  let url = ''

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: { orgId },
    })

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: orgUrl,
      })

      url = stripeSession.url
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: orgUrl,
        cancel_url: orgUrl,
        mode: 'subscription',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'BRL',
              product_data: {
                name: 'Taskify Pro',
                description: 'Unlimited boards for your organization',
              },
              unit_amount: 1000, // 10.00 BRL
              recurring: {
                interval: 'month',
              },
            },
          },
        ],
        metadata: {
          orgId,
        },
      })

      url = stripeSession.url || ''
    }
  } catch (error) {
    return {
      errorMessage: 'Failed to create Stripe session',
    }
  }

  revalidatePath(frontend.organization(orgId))
  return {
    data: url,
  }
}

export const stripeRedirect = createSafeAction(StripeRedirect, handler)
