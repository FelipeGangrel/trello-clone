'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createAuditLog } from '@/lib/audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { frontend } from '@/lib/routes'

import { CreateCard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      errorMessage: 'Unauthorized',
    }
  }

  const { boardId, listId, title, description } = data
  let card

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
    })

    if (!list) {
      return {
        errorMessage: 'List not found',
      }
    }

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = lastCard ? lastCard.order + 1 : 1

    card = await db.card.create({
      data: {
        title,
        description,
        order: newOrder,
        listId,
      },
    })

    await createAuditLog({
      action: 'CREATE',
      entityId: card.id,
      entityType: 'CARD',
      entityTitle: card.title,
    })
  } catch (error) {
    return {
      errorMessage: 'Failed to create card',
    }
  }

  revalidatePath(frontend.board(boardId))
  return {
    data: card,
  }
}

export const createCard = createSafeAction(CreateCard, handler)
