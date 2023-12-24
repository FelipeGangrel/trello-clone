'use client'

import { List } from '@prisma/client'
import { MoreHorizontalIcon } from 'lucide-react'

import { SubmitButton } from '@/components/form'
import { Button, Popover, Separator } from '@/components/ui'

type ListHeaderActionsProps = {
  list: List
  onAddCard: () => void
}

export const ListHeaderActions = ({
  list,
  onAddCard,
}: ListHeaderActionsProps) => {
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
        <Popover.CloseButton />
        <Button variant="menu-action" onClick={onAddCard}>
          Add card...
        </Button>
        <form>
          <input type="hidden" name="id" id="id" value={list.id} />
          <input
            type="hidden"
            name="boardId"
            id="boardId"
            value={list.boardId}
          />
          <SubmitButton variant="menu-action">Copy list...</SubmitButton>
        </form>
        <Separator className="my-4" />
        <form>
          <input type="hidden" name="id" id="id" value={list.id} />
          <input
            type="hidden"
            name="boardId"
            id="boardId"
            value={list.boardId}
          />
          <SubmitButton variant="menu-action">Delete this list...</SubmitButton>
        </form>
      </Popover.Content>
    </Popover.Root>
  )
}
