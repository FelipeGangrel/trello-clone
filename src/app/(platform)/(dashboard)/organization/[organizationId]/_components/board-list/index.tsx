'use server'

import { HelpCircleIcon, User2Icon } from 'lucide-react'

import { Hint } from '@/components/hint'

export const BoardList = async () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <User2Icon className="mr-2 h-6 w-6" />
        <span>Your boards</span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <div
          role="button"
          className="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75"
        >
          <p className="text-sm">Create new board</p>
          <span className="text-xs">5 remaining</span>
          <Hint
            sideOffset={40}
            side="bottom"
            description="Free workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace"
          >
            <HelpCircleIcon className="absolute bottom-2 right-2 h-3 w-3" />
          </Hint>
        </div>
      </div>
    </div>
  )
}
