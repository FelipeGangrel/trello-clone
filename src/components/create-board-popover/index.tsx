'use client'

import { XIcon } from 'lucide-react'
import { toast } from 'sonner'

import { createBoard } from '@/actions/create-board'
import { FormField, SubmitButton } from '@/components/form'
import { Button, Popover } from '@/components/ui'
import { useAction } from '@/hooks'

export type FormPopoverProps = {
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

export const CreateBoardPopover = ({
  children,
  align,
  side,
  sideOffset = 0,
}: FormPopoverProps) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" created!`)
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const handleFormAction = (formData: FormData) => {
    const title = formData.get('title') as string
    execute({ title })
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Content
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="w-80 pt-3"
      >
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          Create board
        </div>
        <Popover.Close asChild tabIndex={-1}>
          <Button
            variant="ghost"
            size="xs"
            className="absolute right-2 top-2 text-neutral-600"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </Popover.Close>
        <form action={handleFormAction} className="space-y-4">
          <div className="space-y-4">
            <FormField
              id="title"
              label="title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <SubmitButton className="w-full">Create</SubmitButton>
        </form>
      </Popover.Content>
    </Popover.Root>
  )
}
