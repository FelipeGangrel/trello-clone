'use client'

import { useQuery } from '@tanstack/react-query'

import { Dialog } from '@/components/ui'
import { useCardModal } from '@/hooks/use-card-modal'
import { fetcher } from '@/lib/fetcher'
import { api } from '@/lib/routes'
import { CardWithList } from '@/types/db'

import { Description } from './description'
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
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {card ? <Description card={card} /> : <Description.Skeleton />}
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
