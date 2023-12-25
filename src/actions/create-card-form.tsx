'use client'

import { PlusIcon, XIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import type { ElementRef, HTMLAttributes, KeyboardEventHandler } from 'react'
import { forwardRef, useRef } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { createCard } copy'
import { FormTextarea, SubmitButton } from '@/components/form'
import { Button } from '@/components/ui'
import { useAction } from '@/hooks'

type CreateCardFormProps = {
  listId: string
  isEditing: boolean
  onEnableEditing: () => void
  onDisableEditing: () => void
} & HTMLAttributes<HTMLTextAreaElement>

export const CreateCardForm = forwardRef<
  HTMLTextAreaElement,
  CreateCardFormProps
>((props, ref) => {
  const {
    listId,
    isEditing,
    onDisableEditing,
    onEnableEditing,
    ...textareaProps
  } = props

  const params = useParams<{ boardId: string }>()

  const formRef = useRef<ElementRef<'form'>>(null)

  const { execute, fieldErrors } = useAction(createCard, {
    onSuccess: (card) => {
      toast.success(`Card "${card.title}" created`)
      onDisableEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onDisableEditing()
    }
  }

  const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  const handleFormAction = (formData: FormData) => {
    const title = formData.get('title') as string
    const listId = formData.get('listId') as string
    const boardId = params.boardId

    execute({ title, listId, boardId })
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, onDisableEditing)

  if (isEditing) {
    return (
      <form
        ref={formRef}
        action={handleFormAction}
        className="m-1 space-y-4 px-1 py-0.5"
      >
        <FormTextarea
          ref={ref}
          id="title"
          placeholder="Enter a title for this card..."
          {...textareaProps}
          onKeyDown={onTextareaKeyDown}
          errors={fieldErrors}
        />
        <input type="hidden" id="listId" name="listId" defaultValue={listId} />
        <div className="flex items-center gap-x-1">
          <SubmitButton variant="brand" className="w-full">
            <span>Add card</span>
          </SubmitButton>
          <Button variant="ghost" size="icon" onClick={onDisableEditing}>
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div className="px-2 pt-2">
      <Button
        variant="slate"
        onClick={onEnableEditing}
        className="w-full justify-start bg-transparent"
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        <span>Add a card</span>
      </Button>
    </div>
  )
})

CreateCardForm.displayName = 'CreateCardForm'
