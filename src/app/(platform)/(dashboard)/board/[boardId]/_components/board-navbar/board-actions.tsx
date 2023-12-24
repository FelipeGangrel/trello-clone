'use client'

import { MoreHorizontalIcon, XIcon } from 'lucide-react'

import { Button, Popover } from '@/components/ui'

type BoardActionsProps = {
  boardId: string
}

export const BoardActions = ({ boardId }: BoardActionsProps) => {
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
          <Popover.Close asChild>
            <Button
              variant="ghost"
              size="xs"
              className="absolute right-2 top-2 text-neutral-600"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </Popover.Close>
          <Button
            variant="ghost"
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          >
            Delete this board
          </Button>
        </Popover.Content>
      </Popover.Root>
    </div>
  )
}
