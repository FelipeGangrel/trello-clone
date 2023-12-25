'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { frontend } from '@/lib/routes'

import { DeleteCard } from './schema'
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
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    })

    await createAuditLog({
      action: 'DELETE',
      entityId: card.id,
      entityType: 'CARD',
      entityTitle: card.title,
    })
  } catch (error) {
    return {
      errorMessage: 'Failed to delete',
    }
  }

  revalidatePath(frontend.board(boardId))
  return {
    data: card,
  }
}

export const deleteCard = createSafeAction(DeleteCard, handler)
