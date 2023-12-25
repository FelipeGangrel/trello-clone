import { z } from 'zod'

export const UpdateCardsOrder = z.object({
  boardId: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      order: z.number(),
      listId: z.string(),
    })
  ),
})
