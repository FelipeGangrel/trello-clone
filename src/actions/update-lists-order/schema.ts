import { z } from 'zod'

export const UpdateListsOrder = z.object({
  boardId: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      order: z.number(),
    })
  ),
})
