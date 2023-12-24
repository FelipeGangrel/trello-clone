import { z } from 'zod'

export type FieldErrors<T> = {
  [K in keyof T]?: string[]
}

export type ActionState<TInput, TOutput = undefined> = {
  fieldErrors?: FieldErrors<TInput>
  errorMessage?: string | null
  data?: TOutput
}

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationResult = schema.safeParse(data)

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten()

      return {
        fieldErrors: fieldErrors.fieldErrors as FieldErrors<TInput>,
      }
    }

    return handler(validationResult.data)
  }
}
