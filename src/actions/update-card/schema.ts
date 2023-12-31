import { z } from 'zod'

import { CreateCard } from '../create-card/schema'

export const UpdateCard = z.object({
  id: z.string(),
  boardId: CreateCard.shape.boardId,
  title: z.optional(CreateCard.shape.title),
  description: CreateCard.shape.description,
})
