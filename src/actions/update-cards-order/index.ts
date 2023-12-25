'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { frontend } from '@/lib/routes'

import { UpdateCardsOrder } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      errorMessage: 'Unauthorized',
    }
  }

  const { items, boardId } = data

  let cards

  try {
    const transaction = items.map((card) => {
      return db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    })

    cards = await db.$transaction(transaction)
  } catch (error) {
    return {
      errorMessage: 'Failed to reorder',
    }
  }

  revalidatePath(frontend.board(boardId))
  return {
    data: cards,
  }
}

export const updateCardsOrder = createSafeAction(UpdateCardsOrder, handler)
