import type { Board } from '@prisma/client'

import { BoardActions } from './board-actions'
import { BoardTitleForm } from './board-title-form'

type BoardNavbarProps = {
  board: Board
}

export const BoardNavbar = async ({ board }: BoardNavbarProps) => {
  return (
    <div className="fixed top-14 z-[40] w-full items-center bg-black/50 text-white backdrop-blur">
      <div className="container flex h-14 items-center gap-x-4">
        <BoardTitleForm board={board} />
        <div className="ml-auto">
          <BoardActions boardId={board.id} />
        </div>
      </div>
    </div>
  )
}
