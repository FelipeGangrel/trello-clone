'use client'

import { PlusIcon } from 'lucide-react'
import { forwardRef, HTMLAttributes } from 'react'

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

  return (
    <form>
      {/* <textarea ref={ref} /> */}
      <Button
        variant="menu-action"
        className="text-muted-foreground hover:bg-transparent"
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        <span>Add a card</span>
      </Button>
    </form>
  )
})

CreateCardForm.displayName = 'CreateCardForm'
