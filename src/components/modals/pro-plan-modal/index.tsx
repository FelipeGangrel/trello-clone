'use client'

import Image from 'next/image'

import { Button, Dialog } from '@/components/ui'
import { useProPlanModal } from '@/hooks'

export const ProPlanModal = () => {
  const proModal = useProPlanModal()

  return (
    <Dialog.Root open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <Dialog.Content className="max-w-md overflow-hidden p-0">
        <div className="relative flex aspect-video items-center justify-center">
          <Image
            src="/images/hero.svg"
            alt="Pro plan"
            fill
            className="object-cover"
          />
        </div>
        <div className="mx-auto space-y-6 p-6 text-neutral-700">
          <h2 className="text-xl font-semibold">
            Upgrade to Taskify Pro Today!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of Taskify
          </p>
          <div className="pl-3">
            <ul className="list-disc text-sm">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more</li>
            </ul>
          </div>
          <Button className="w-full" variant="brand">
            Upgrade now
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
