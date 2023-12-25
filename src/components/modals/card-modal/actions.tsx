import { CopyIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

import { duplicateCard } from '@/actions/duplicate-card'
import { Button, Skeleton } from '@/components/ui'
import { useAction, useCardModal } from '@/hooks'
import type { CardWithList } from '@/types/db'

type ActionsProps = {
  card: CardWithList
}

export const Actions = ({ card }: ActionsProps) => {
  const params = useParams<{ boardId: string }>()
  const cardModal = useCardModal()

  const { execute: executeDuplicateCard, isLoading: isDuplicatingCard } =
    useAction(duplicateCard, {
      onSuccess: (card) => {
        toast.success(`Card "${card.title}" duplicated`)
        cardModal.onClose()
      },
      onError: (error) => {
        toast.error(error)
      },
    })

  const onDuplicate = () => {
    executeDuplicateCard({
      id: card.id,
      boardId: params.boardId,
    })
  }

  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        variant="menu-action"
        size="xs"
        onClick={onDuplicate}
        disabled={isDuplicatingCard}
      >
        <CopyIcon className="mr-2 h-4 w-4" />
        <span>Duplicate</span>
      </Button>
    </div>
  )
}

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="mt-2 space-y-2">
      <Skeleton className="h-4 w-20 bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
    </div>
  )
}
