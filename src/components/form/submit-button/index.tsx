import { forwardRef } from 'react'
import { useFormStatus } from 'react-dom'

import { Button, type ButtonProps } from '@/components/ui/button'

export type SubmitButtonProps = ButtonProps

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  (props, ref) => {
    const { children, disabled, type = 'submit', ...buttonProps } = props
    const { pending } = useFormStatus()

    return (
      <Button
        ref={ref}
        type={type}
        disabled={pending || disabled}
        {...buttonProps}
      >
        {children}
      </Button>
    )
  }
)

SubmitButton.displayName = 'SubmitButton'
