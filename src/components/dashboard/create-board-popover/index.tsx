'use client'

import { useRouter } from 'next/navigation'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'

import { createBoard } from '@/actions'
import { FormField, SubmitButton } from '@/components/form'
import { Popover } from '@/components/ui'
import { useAction } from '@/hooks'
import { frontend } from '@/lib/routes'

import { BoardImagePicker } from './board-image-picker'

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
  const closeButtonRef = useRef<ElementRef<'button'>>(null)
  const router = useRouter()

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (board) => {
      toast.success(`Board "${board.title}" created!`)
      closeButtonRef.current?.click()
      router.push(frontend.board(board.id))
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const handleFormAction = (formData: FormData) => {
    const title = formData.get('title') as string
    const image = formData.get('image') as string

    execute({ title, image })
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
        <Popover.CloseButton ref={closeButtonRef} tabIndex={-1} />
        <form action={handleFormAction} className="space-y-4">
          <div className="space-y-4">
            <BoardImagePicker id="image" errors={fieldErrors} />
            <FormField
              id="title"
              label="title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <SubmitButton variant="brand" className="w-full">
            Create
          </SubmitButton>
        </form>
      </Popover.Content>
    </Popover.Root>
  )
}
