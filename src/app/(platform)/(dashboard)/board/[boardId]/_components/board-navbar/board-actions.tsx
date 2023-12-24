'use client'

import { MoreHorizontalIcon } from 'lucide-react'
import { toast } from 'sonner'

import { deleteBoard } from '@/actions/delete-board'
import { Button, Popover } from '@/components/ui'
import { useAction } from '@/hooks'

type BoardActionsProps = {
  boardId: string
}

export const BoardActions = ({ boardId }: BoardActionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error)
    },
  })

  const onDelete = () => {
    execute({ id: boardId })
  }

  return (
    <div className="flex items-center gap-x-2">
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button variant="transparent" size="icon">
            <MoreHorizontalIcon />
          </Button>
        </Popover.Trigger>
        <Popover.Content className="px-0 pb-3 pt-3" side="bottom" align="end">
          <div className="pb-4 text-center text-sm font-medium text-neutral-600">
            <p>Board Actions</p>
          </div>
          <Popover.CloseButton />
          <Button variant="menu-action" onClick={onDelete} disabled={isLoading}>
            Delete this board
          </Button>
        </Popover.Content>
      </Popover.Root>
    </div>
  )
}
