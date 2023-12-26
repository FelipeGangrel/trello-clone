import { z } from 'zod'

export const CreateTask = z.object({
  cardId: z.string(),
  boardId: z.string(),
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(3, 'Title must be at least 3 characters long')
    .trim(),
})
