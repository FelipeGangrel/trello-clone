'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { frontend } from '@/lib/routes'
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
