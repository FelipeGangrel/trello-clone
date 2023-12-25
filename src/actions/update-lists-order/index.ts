'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { frontend } from '@/lib/routes'

import { UpdateListsOrder } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      errorMessage: 'Unauthorized',
    }
  }

  const { items, boardId } = data
  let lists

  try {
    const transaction = items.map((list) => {
      return db.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      })
    })

    lists = await db.$transaction(transaction)
  } catch (error) {
    return {
      errorMessage: 'Failed to reorder',
    }
  }

  revalidatePath(frontend.board(boardId))
  return {
    data: lists,
  }
}

export const updateListsOrder = createSafeAction(UpdateListsOrder, handler)
