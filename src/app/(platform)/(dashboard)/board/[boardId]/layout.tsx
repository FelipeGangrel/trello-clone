import { auth } from '@clerk/nextjs'
import { notFound, redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { frontend } from '@/lib/routes'

import { BoardNavbar } from './_components'

type Params = {
  boardId: string
}

type LayoutProps = {
  children: React.ReactNode
  params: Params
}

export async function generateMetadata({ params }: { params: Params }) {
  const { orgId } = auth()

  if (!orgId) {
    return {
      title: 'Board',
    }
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  })

  return {
    title: board?.title,
  }
}

const BoardLayout = async ({ children, params }: LayoutProps) => {
  const { orgId } = auth()

  if (!orgId) {
    return redirect(frontend.selectOrganization())
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  })

  if (!board) {
    return notFound()
  }

  return (
    <div
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${board?.imageFullUrl})`,
      }}
    >
      <BoardNavbar board={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative h-full pt-28">{children}</main>
    </div>
  )
}

export default BoardLayout
