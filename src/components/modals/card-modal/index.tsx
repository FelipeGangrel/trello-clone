'use client'

import { useQuery } from '@tanstack/react-query'

import { Dialog, Skeleton } from '@/components/ui'
import { useCardModal } from '@/hooks/use-card-modal'
import { fetcher } from '@/lib/fetcher'
import { api } from '@/lib/routes'
import { CardWithList } from '@/types/db'

import { Header } from './header'

export const CardModal = () => {
  const cardId = useCardModal((state) => state.id!)
  const isOpen = useCardModal((state) => state.isOpen)
  const onClose = useCardModal((state) => state.onClose)

  const { data: card } = useQuery<CardWithList>({
    queryKey: ['card', cardId],
    queryFn: () => fetcher(api.fetchCard(cardId)),
  })

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        {card ? <Header card={card} /> : <Header.Skeleton />}
      </Dialog.Content>
    </Dialog.Root>
  )
}
