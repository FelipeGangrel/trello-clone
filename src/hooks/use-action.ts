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
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(
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

        setFieldErrors(result.fieldErrors)
        setErrorMessage(result.errorMessage)
        setData(result.data)

        if (result.errorMessage) {
          options?.onError?.(result.errorMessage)
        }

        if (result.data) {
          options?.onSuccess?.(result.data)
        }
      } finally {
        setIsLoading(false)
        options?.onComplete?.()
      }
    },
    [action, options]
  )

  const reset = useCallback(() => {
    setFieldErrors(undefined)
    setErrorMessage(undefined)
    setData(undefined)
  }, [])

  return {
    fieldErrors,
    errorMessage,
    data,
    isLoading,
    execute,
    reset,
  }
}
