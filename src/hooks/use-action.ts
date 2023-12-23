import { useCallback, useState } from 'react'

import { ActionState, FieldErrors } from '@/lib/create-safe-action'

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>

type UseActionOptions<TOutput> = {
  onSuccess?: (data: TOutput) => void
  onError?: (errorMessage: string) => void
  onComplete?: () => void
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options?: UseActionOptions<TOutput>
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )
  const [data, setData] = useState<TOutput | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true)

      try {
        const result = await action(input)

        if (!result) {
          return
        }

        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors)
        } else {
          setFieldErrors(undefined)
        }

        if (result.errorMessage) {
          setErrorMessage(result.errorMessage)
          options?.onError?.(result.errorMessage)
        } else {
          setErrorMessage(undefined)
        }

        if (result.data) {
          setData(result.data)
          options?.onSuccess?.(result.data)
        } else {
          setData(undefined)
        }
      } finally {
        setIsLoading(false)
        options?.onComplete?.()
      }
    },
    [action, options]
  )

  return {
    fieldErrors,
    errorMessage,
    data,
    isLoading,
    execute,
  }
}
