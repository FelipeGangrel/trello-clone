import { z } from 'zod'

import { CreateBoard } from '../create-board/schema'

export const UpdateBoard = z.object({
  id: z.string(),
  title: CreateBoard.shape.title,
})
