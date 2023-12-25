'use client'

import { Dialog } from '@/components/ui'
import { useCardModal } from '@/hooks/use-card-modal'

export const CardModal = () => {
  const cardId = useCardModal((state) => state?.id)
  const isOpen = useCardModal((state) => state.isOpen)
  const onClose = useCardModal((state) => state.onClose)

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>I am a modal</Dialog.Content>
    </Dialog.Root>
  )
}
