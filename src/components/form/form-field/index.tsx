'use client'

import { forwardRef } from 'react'
import { useFormStatus } from 'react-dom'

import { Input, Label } from '@/components/ui'
import { cn } from '@/lib/utils'

import { FormErrors } from '../form-errors'

export type InputProps = {
  id: string
  label?: string
  errors?: Record<string, string[] | undefined>
} & React.InputHTMLAttributes<HTMLInputElement>

export const FormField = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      className,
      disabled,
      errors,
      id,
      label,
      type = 'text',
      ...inputProps
    } = props
    const { pending } = useFormStatus()

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}
          <Input
            {...inputProps}
            ref={ref}
            id={id}
            name={id}
            type={type}
            disabled={pending || disabled}
            aria-describedby={`${id}-error`}
            className={cn('h-7 px-2 py-1 text-sm', className)}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    )
  }
)

FormField.displayName = 'FormInput'
