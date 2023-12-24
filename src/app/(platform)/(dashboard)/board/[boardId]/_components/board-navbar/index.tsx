import type { Board } from '@prisma/client'

import { BoardTitleForm } from './board-title-form'

type BoardNavbarProps = {
  board: Board
}

export const BoardNavbar = async ({ board }: BoardNavbarProps) => {
  return (
    <div className="fixed top-14 z-[40] flex h-14 w-full items-center bg-black/50 text-white">
      <div className="container flex items-center gap-x-4">
        <BoardTitleForm board={board} />
      </div>
    </div>
  )
}
