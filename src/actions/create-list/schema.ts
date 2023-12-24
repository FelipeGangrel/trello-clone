import { z } from 'zod'

export const CreateList = z.object({
  boardId: z.string(),
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(3, 'Title must be at least 3 characters long'),
})
