import { OrganizationInfo } from '@/components/dashboard'
import { Separator } from '@/components/ui'
import { checkSubscription } from '@/lib/subscription'

import { SubscriptionButton } from './_components'

const BillingPage = async () => {
  const isPro = await checkSubscription()
  return (
    <div className="w-full">
      <OrganizationInfo isPro={isPro} />
      <Separator className="my-4" />
      <SubscriptionButton isPro={isPro} />
    </div>
  )
}

export default BillingPage
