'use client'

import type { Board } from '@prisma/client'
import type { ElementRef, KeyboardEvent } from 'react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

import { updateBoard } from '@/actions/update-board'
import { FormErrors, FormField } from '@/components/form'
import { Button } from '@/components/ui'
import { useAction } from '@/hooks'

type BoardTitleFormProps = {
  board: Board
}

export const BoardTitleForm = ({ board }: BoardTitleFormProps) => {
  const { execute, fieldErrors } = useAction(updateBoard, {
    onSuccess: (board) => {
      toast.success(`Board "${board.title}" updated`)
      setTitle(board.title)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const [title, setTitle] = useState(board.title)
  const [isEditing, setIsEditing] = useState(false)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  const disableEditing = () => setIsEditing(false)

  const handleFormAction = (formData: FormData) => {
    const title = formData.get('title') as string

    if (title === board.title) {
      return disableEditing()
    }

    execute({ id: board.id, title })
  }

  const onBlur = () => {
    formRef?.current?.requestSubmit()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      disableEditing()
    }
  }

  if (isEditing) {
    return (
      <form
        ref={formRef}
        action={handleFormAction}
        className="flex items-center gap-x-2"
      >
        <FormField
          ref={inputRef}
          id="title"
          defaultValue={title}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          className="border-none bg-transparent px-2 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent"
        />
        <FormErrors id="title" errors={fieldErrors} className="mt-0" />
      </form>
    )
  }

  return (
    <Button
      className="px-2 text-lg font-bold"
      variant="transparent"
      onClick={enableEditing}
    >
      {title}
    </Button>
  )
}
