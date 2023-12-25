'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createAuditLog } from '@/lib/audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { hasAvailableCount, increaseBoardsCount } from '@/lib/org-limit'
import { frontend } from '@/lib/routes'
import { checkSubscription } from '@/lib/subscription'
import { parseImageString } from '@/lib/unsplash'

import { CreateBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      errorMessage: 'Unauthorized',
    }
  }

  const canCreate = await hasAvailableCount()
  const isPro = await checkSubscription()

  if (!canCreate && !isPro) {
    return {
      errorMessage:
        'You have reached your limit of free boards. Upgrade your plan to create more.',
    }
  }

  const { title, image } = data
  let board

  try {
    const { id, urls, links, user } = parseImageString(image)

    board = await db.board.create({
      data: {
        orgId,
        title,
        imageId: id,
        imageFullUrl: urls.full,
        imageThumbUrl: urls.thumb,
        imageLinkHtml: links.html,
        imageUserName: user.name,
      },
    })

    if (!isPro) {
      await increaseBoardsCount()
    }

    createAuditLog({
      action: 'CREATE',
      entityId: board.id,
      entityType: 'BOARD',
      entityTitle: board.title,
    })
  } catch (error) {
    return {
      errorMessage: 'Failed to create board',
    }
  }

  revalidatePath(frontend.board(board.id))
  return {
    data: board,
  }
}

export const createBoard = createSafeAction(CreateBoard, handler)
