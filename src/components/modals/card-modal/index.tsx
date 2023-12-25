'use client'

import type { AuditLog } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { Dialog } from '@/components/ui'
import { useCardModal } from '@/hooks/use-card-modal'
import { fetcher } from '@/lib/fetcher'
import { api } from '@/lib/routes'
import type { CardWithList } from '@/types/db'

import { Actions } from './actions'
import { Activity } from './activity'
import { Description } from './description'
import { Header } from './header'

export const CardModal = () => {
  const cardId = useCardModal((state) => state.id!)
  const cardModal = useCardModal()

  const { data: card } = useQuery<CardWithList>({
    queryKey: ['card', cardId],
    queryFn: () => fetcher(api.fetchCard(cardId)),
  })

  const { data: auditLogs } = useQuery<AuditLog[]>({
    queryKey: ['card-logs', cardId],
    queryFn: () => fetcher(api.fetchCardLogs(cardId)),
  })

  return (
    <Dialog.Root open={cardModal.isOpen} onOpenChange={cardModal.onClose}>
      <Dialog.Content className="max-w-3xl">
        {card ? <Header card={card} /> : <Header.Skeleton />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {card ? <Description card={card} /> : <Description.Skeleton />}
              {auditLogs ? (
                <Activity auditLogs={auditLogs} />
              ) : (
                <Activity.Skeleton />
              )}
            </div>
          </div>
          {card ? <Actions card={card} /> : <Actions.Skeleton />}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
