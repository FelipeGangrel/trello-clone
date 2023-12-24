import { z } from 'zod'

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(3, 'Title must be at least 3 characters long')
    .trim(),
  image: z.string({
    required_error: 'Select an image for your board',
    invalid_type_error: 'Select an image for your board',
  }),
})
