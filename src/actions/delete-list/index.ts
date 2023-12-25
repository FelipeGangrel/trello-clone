'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { frontend } from '@/lib/routes'

import { DeleteList } from './schema'
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
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    })

    await createAuditLog({
      action: 'DELETE',
      entityId: list.id,
      entityType: 'LIST',
      entityTitle: list.title,
    })
  } catch (error) {
    return {
      errorMessage: 'Failed to delete',
    }
  }

  revalidatePath(frontend.board(boardId))
  return {
    data: list,
  }
}

export const deleteList = createSafeAction(DeleteList, handler)
