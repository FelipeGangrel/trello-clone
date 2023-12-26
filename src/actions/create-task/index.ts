'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createAuditLog } from '@/lib/audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { frontend } from '@/lib/routes'

import { CreateTask } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      errorMessage: 'Unauthorized',
    }
  }

  const { boardId, cardId, title } = data
  let task

  try {
    task = await db.task.create({
      data: {
        title,
        cardId,
        completed: false,
      },
    })

    await createAuditLog({
      action: 'CREATE',
      entityId: task.id,
      entityType: 'TASK',
      entityTitle: task.title,
    })
  } catch (error) {
    return {
      errorMessage: 'Failed to create task',
    }
  }

  revalidatePath(frontend.board(boardId))
  return {
    data: task,
  }
}

export const createTask = createSafeAction(CreateTask, handler)
