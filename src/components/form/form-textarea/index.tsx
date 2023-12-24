import { forwardRef, HTMLAttributes } from 'react'
import { useFormStatus } from 'react-dom'

import { Label, Textarea } from '@/components/ui'
import { cn } from '@/lib/utils'

import { FormErrors } from '..'

type FormTextareaProps = {
  id: string
  label?: string
  errors?: Record<string, string[] | undefined>
  disabled?: boolean
  placeholder?: string
} & HTMLAttributes<HTMLTextAreaElement>

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (props, ref) => {
    const { id, label, className, disabled, errors, ...textareaProps } = props

    const { pending } = useFormStatus()

    return (
      <div className="w-full space-y-2">
        <div className="w-full space-y-1">
          {label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}
          <Textarea
            id={id}
            ref={ref}
            disabled={pending || disabled}
            {...textareaProps}
            className={cn(
              'resize-none shadow-sm outline-none ring-0 focus:ring-0 focus-visible:ring-0',
              className
            )}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    )
  }
)

FormTextarea.displayName = 'FormTextarea'
