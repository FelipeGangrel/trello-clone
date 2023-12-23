import { XCircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export type FormErrorsProps = {
  id: string
  errors?: Record<string, string[] | undefined>
} & React.HTMLAttributes<HTMLDivElement>

export const FormErrors = (props: FormErrorsProps) => {
  const { className, errors, id, ...divProps } = props

  if (!errors || !errors[id]) return null

  return (
    <div
      {...divProps}
      className={cn('mt-2 text-xs text-rose-600', className)}
      id={`${id}-error`}
      aria-live="polite"
    >
      {errors[id]?.map((error, index) => (
        <div
          key={index}
          className="flex items-center space-x-1 rounded-sm border border-rose-500 bg-rose-500/10 p-2 font-medium"
        >
          <XCircleIcon className="mr-2 h-4 w-4" />
          <span>{error}</span>
        </div>
      ))}
    </div>
  )
}
