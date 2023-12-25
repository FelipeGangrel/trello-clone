'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createAuditLog } from '@/lib/audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { decreaseBoardsCount } from '@/lib/org-limit'
import { frontend } from '@/lib/routes'
import { checkSubscription } from '@/lib/subscription'

import { DeleteBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      errorMessage: 'Unauthorized',
    }
  }

  const isPro = await checkSubscription()

  const { id } = data
  let board

  try {
    board = await db.board.delete({
      where: { id, orgId },
    })

    if (!isPro) {
      await decreaseBoardsCount()
    }

    await createAuditLog({
      action: 'DELETE',
      entityId: board.id,
      entityType: 'BOARD',
      entityTitle: board.title,
    })
  } catch (error) {
    return {
      errorMessage: 'Failed to delete',
    }
  }

  revalidatePath(frontend.organization(orgId))
  redirect(frontend.organization(orgId))
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)
