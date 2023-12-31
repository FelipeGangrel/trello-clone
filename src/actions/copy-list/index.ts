'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createAuditLog } from '@/lib/audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { frontend } from '@/lib/routes'

import { CopyList } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      errorMessage: 'Unauthorized',
    }
  }

  const { id, boardId } = data
  let list

  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    })

    if (!listToCopy) {
      return {
        errorMessage: 'List not found',
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
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    })

    await createAuditLog({
      action: 'CREATE',
      entityId: list.id,
      entityType: 'LIST',
      entityTitle: list.title,
    })

    list.cards.forEach(async (card) => {
      await createAuditLog({
        action: 'CREATE',
        entityId: card.id,
        entityType: 'CARD',
        entityTitle: card.title,
      })
    })
  } catch (error) {
    return {
      errorMessage: 'Failed to copy',
    }
  }

  revalidatePath(frontend.board(boardId))
  return {
    data: list,
  }
}

export const copyList = createSafeAction(CopyList, handler)
