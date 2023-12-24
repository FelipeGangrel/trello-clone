import { z } from 'zod'

import { CreateList } from '../create-list/schema'

export const UpdateList = z.object({
  id: z.string(),
  boardId: CreateList.shape.boardId,
  title: CreateList.shape.title,
})
