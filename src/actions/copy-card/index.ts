'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createAuditLog } from '@/lib/audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { frontend } from '@/lib/routes'

import { CopyCard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      errorMessage: 'Unauthorized',
    }
  }

  const { id, boardId } = data
  let card

  try {
    const cardToCopy = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    })

    if (!cardToCopy) {
      return {
        errorMessage: 'Card not found',
      }
    }

    const lastCard = await db.card.findFirst({
      where: { listId: cardToCopy.listId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = lastCard ? lastCard.order + 1 : 1

    card = await db.card.create({
      data: {
        title: `${cardToCopy.title} - Copy`,
        description: cardToCopy.description,
        order: newOrder,
        listId: cardToCopy.listId,
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
      errorMessage: 'Failed to copy',
    }
  }

  revalidatePath(frontend.board(boardId))
  return {
    data: card,
  }
}

export const copyCard = createSafeAction(CopyCard, handler)
