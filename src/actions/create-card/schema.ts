import { z } from 'zod'

export const CreateCard = z.object({
  listId: z.string(),
  boardId: z.string(),
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(3, 'Title must be at least 3 characters long')
    .trim(),
  description: z.optional(
    z
      .string({
        required_error: 'Description is required',
        invalid_type_error: 'Description is required',
      })
      .min(3, 'Description must be at least 3 characters long')
      .trim()
  ),
})
