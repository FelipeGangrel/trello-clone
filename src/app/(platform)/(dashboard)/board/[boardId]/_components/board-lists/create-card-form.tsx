'use client'

import { PlusIcon, XIcon } from 'lucide-react'
import { forwardRef, HTMLAttributes } from 'react'
import { useEventListener } from 'usehooks-ts'

import { FormTextarea, SubmitButton } from '@/components/form'
import { Button } from '@/components/ui'

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

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onDisableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)

  if (isEditing) {
    return (
      <form className="m-1 space-y-4 px-1 py-0.5">
        <FormTextarea
          ref={ref}
          id="title"
          placeholder="Enter a title for this card..."
          {...textareaProps}
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
        variant="menu-action"
        onClick={onEnableEditing}
        className="text-muted-foreground hover:bg-transparent"
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        <span>Add a card</span>
      </Button>
    </div>
  )
})

CreateCardForm.displayName = 'CreateCardForm'
