'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { frontend } from '@/lib/routes'

import { DeleteBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      errorMessage: 'Unauthorized',
    }
  }

  const { id } = data

  let board

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    })
  } catch (error) {
    return {
      errorMessage: 'Failed to delete board',
    }
  }

  revalidatePath(frontend.organization(orgId))
  redirect(frontend.organization(orgId))
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)
