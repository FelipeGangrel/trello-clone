import { auth } from '@clerk/nextjs'

import { db } from './db'

const DAYS_IN_MS = 1000 * 60 * 60 * 24

export async function checkSubscription() {
  const { orgId } = auth()

  if (!orgId) {
    return false
  }

  const orgSubscription = await db.orgSubscription.findUnique({
    where: { orgId },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  if (!orgSubscription) {
    return false
  }

  const { stripeCustomerId, stripeCurrentPeriodEnd } = orgSubscription

  const isValid =
    stripeCustomerId &&
    // we even give the user a 1 day grace period
    stripeCurrentPeriodEnd?.getTime()! + DAYS_IN_MS > Date.now()

  return !!isValid
}
