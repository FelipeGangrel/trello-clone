'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { frontend } from '@/lib/routes'

import { UpdateList } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      errorMessage: 'Unauthorized',
    }
  }

  const { id, boardId, title } = data
  let list

  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      data: { title },
    })

    await createAuditLog({
      action: 'UPDATE',
      entityId: list.id,
      entityType: 'LIST',
      entityTitle: list.title,
    })
  } catch (error) {
    return {
      errorMessage: 'Failed to update list',
    }
  }

  revalidatePath(frontend.board(boardId))
  return {
    data: list,
  }
}

export const updateList = createSafeAction(UpdateList, handler)
