'use server'

import { auth } from '@clerk/nextjs'
import { HelpCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { CreateBoardPopover } from '@/components/dashboard'
import { Hint } from '@/components/hint'
import { Skeleton } from '@/components/ui'
import { db } from '@/lib/db'
import { frontend } from '@/lib/routes'

export const BoardList = async () => {
  const { orgId } = auth()

  if (!orgId) {
    return redirect(frontend.selectOrganization())
  }

  const boards = await db.board.findMany({
    where: { orgId },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {boards.map((board) => (
        <Link
          key={board.id}
          href={frontend.board(board.id)}
          className="group relative aspect-video h-full w-full overflow-hidden rounded-sm bg-sky-700 bg-cover bg-center bg-no-repeat p-2"
          style={{
            backgroundImage: `url(${board.imageThumbUrl})`,
          }}
        >
          <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
          <p className="relative font-semibold text-white">{board.title}</p>
        </Link>
      ))}
      <CreateBoardPopover side="right" sideOffset={10}>
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
      </CreateBoardPopover>
    </div>
  )
}

BoardList.Skeleton = function BoardListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <Skeleton key={index} className="rounded-m aspect-video" />
      ))}
    </div>
  )
}
