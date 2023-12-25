'use client'

import { toast } from 'sonner'

import { stripeRedirect } from '@/actions'
import { Button } from '@/components/ui'
import { useAction, useProPlanModal } from '@/hooks'

type SubscriptionButtonProps = {
  isPro: boolean
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const proModal = useProPlanModal()

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (url) => {
      window.location.href = url
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onClick = () => {
    if (isPro) {
      // For Billing portal, you have to activate it on https://dashboard.stripe.com/test/settings/billing/portal
      execute({})
    } else {
      proModal.onOpen()
    }
  }

  return (
    <div>
      <Button variant="brand" onClick={onClick} disabled={isLoading}>
        {isPro ? 'Manage subscription' : 'Upgrade to pro'}
      </Button>
    </div>
  )
}
