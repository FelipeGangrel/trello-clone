import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { frontend } from '@/lib/routes'

import { ListContainer } from './_components'

type BoardPageProps = {
  params: {
    boardId: string
  }
}

const BoardPage = async ({ params }: BoardPageProps) => {
  const { orgId } = auth()

  if (!orgId) {
    redirect(frontend.selectOrganization())
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  })

  return (
    <div className="h-full overflow-x-auto p-4">
      <ListContainer boardId={params.boardId} lists={lists} />
    </div>
  )
}

export default BoardPage
