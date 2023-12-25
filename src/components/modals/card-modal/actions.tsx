import { CopyIcon, TrashIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

import { copyCard, deleteCard } from '@/actions'
import { Button, Skeleton } from '@/components/ui'
import { useAction, useCardModal } from '@/hooks'
import type { CardWithList } from '@/types/db'

type ActionsProps = {
  card: CardWithList
}

export const Actions = ({ card }: ActionsProps) => {
  const params = useParams<{ boardId: string }>()
  const cardModal = useCardModal()

  const { execute: executeCopy, isLoading: isCopying } = useAction(copyCard, {
    onSuccess: (card) => {
      toast.success(`Card "${card.title}" created`)
      cardModal.onClose()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const { execute: executeDelete, isLoading: isDeleting } = useAction(
    deleteCard,
    {
      onSuccess: (card) => {
        toast.success(`Card "${card.title}" deleted`)
        cardModal.onClose()
      },
      onError: (error) => {
        toast.error(error)
      },
    }
  )

  const onCopy = () => {
    executeCopy({
      id: card.id,
      boardId: params.boardId,
    })
  }

  const onDelete = () => {
    executeDelete({
      id: card.id,
      boardId: params.boardId,
    })
  }

  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        variant="slate"
        size="xs"
        onClick={onCopy}
        disabled={isCopying}
        className="w-full justify-start"
      >
        <CopyIcon className="mr-2 h-4 w-4" />
        <span>Copy</span>
      </Button>
      <Button
        variant="slate"
        size="xs"
        onClick={onDelete}
        disabled={isCopying}
        className="w-full justify-start"
      >
        <TrashIcon className="mr-2 h-4 w-4" />
        <span>Delete</span>
      </Button>
    </div>
  )
}

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="mt-2 space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  )
}
