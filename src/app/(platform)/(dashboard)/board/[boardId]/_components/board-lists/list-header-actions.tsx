'use client'

import { List } from '@prisma/client'
import { MoreHorizontalIcon } from 'lucide-react'
import type { ElementRef } from 'react'
import { useRef } from 'react'
import { toast } from 'sonner'

import { deleteList } from '@/actions/delete-list'
import { duplicateList } from '@/actions/duplicate-list'
import { Button, Popover, Separator } from '@/components/ui'
import { useAction } from '@/hooks'

type ListHeaderActionsProps = {
  list: List
  onAddCard: () => void
}

export const ListHeaderActions = ({
  list,
  onAddCard,
}: ListHeaderActionsProps) => {
  const closeButtonRef = useRef<ElementRef<'button'>>(null)

  const { execute: executeDelete, isLoading: isDeleting } = useAction(
    deleteList,
    {
      onSuccess: (list) => {
        toast.success(`List "${list.title}" was deleted`)
        closeButtonRef.current?.click()
      },
      onError: (error) => {
        toast.error(error)
      },
    }
  )

  const { execute: executeDuplicate, isLoading: isDuplicating } = useAction(
    duplicateList,
    {
      onSuccess: (list) => {
        toast.success(`List "${list.title}" was created`)
        closeButtonRef.current?.click()
      },
      onError: (error) => {
        toast.error(error)
      },
    }
  )

  const onDuplicate = () => {
    executeDuplicate({ id: list.id, boardId: list.boardId })
  }

  const onDelete = () => {
    executeDelete({ id: list.id, boardId: list.boardId })
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="ghost" size="xs">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Content
        className="px-0 pb-3 pt-3"
        side="bottom"
        align="end"
        alignOffset={-8}
      >
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          <p>List Actions</p>
        </div>
        <Popover.CloseButton ref={closeButtonRef} />
        <Button variant="menu-action" onClick={onAddCard}>
          Add card...
        </Button>
        <Button
          variant="menu-action"
          onClick={onDuplicate}
          disabled={isDuplicating}
        >
          Duplicate this list...
        </Button>
        <Separator className="my-4" />
        <Button variant="menu-action" onClick={onDelete} disabled={isDeleting}>
          Delete this list
        </Button>
      </Popover.Content>
    </Popover.Root>
  )
}
