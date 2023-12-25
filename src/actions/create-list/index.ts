'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createAuditLog } from '@/lib/audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { frontend } from '@/lib/routes'

import { CreateList } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      errorMessage: 'Unauthorized',
    }
  }

  const { boardId, title } = data
  let list

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    })

    if (!board) {
      return {
        errorMessage: 'Board not found',
      }
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = lastList ? lastList.order + 1 : 1

    list = await db.list.create({
      data: {
        boardId,
        title,
        order: newOrder,
      },
    })

    await createAuditLog({
      action: 'CREATE',
      entityId: list.id,
      entityType: 'LIST',
      entityTitle: list.title,
    })
  } catch (error) {
    return {
      errorMessage: 'Failed to create list',
    }
  }

  revalidatePath(frontend.board(boardId))
  return {
    data: list,
  }
}

export const createList = createSafeAction(CreateList, handler)
