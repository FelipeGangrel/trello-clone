'use client'

import { List } from '@prisma/client'
import type { ElementRef } from 'react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener } from 'usehooks-ts'

import { updateList } from '@/actions/update-list'
import { FormField } from '@/components/form'
import { useAction } from '@/hooks'

import { ListHeaderActions } from './list-header-actions'

type ListItemHeader = {
  list: List
}

export const ListHeader = ({ list }: ListItemHeader) => {
  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const [title, setTitle] = useState(list.title)
  const [isEditing, setIsEditing] = useState(false)

  const { execute, reset, fieldErrors } = useAction(updateList, {
    onSuccess: (list) => {
      toast.success(`List was renamed to "${list.title}"`)
      setTitle(list.title)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
    reset()
  }

  const handleFormAction = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string
    const title = formData.get('title') as string

    if (title === list.title) {
      return disableEditing()
    }

    execute({ id, boardId, title })
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)

  if (isEditing) {
    return (
      <div className="flex items-start justify-between gap-x-2 px-2 pt-2 font-semibold">
        <form
          ref={formRef}
          action={handleFormAction}
          className="w-full px-[2px]"
        >
          <input type="hidden" id="id" name="id" defaultValue={list.id} />
          <input
            type="hidden"
            id="boardId"
            name="boardId"
            defaultValue={list.boardId}
          />
          <FormField
            ref={inputRef}
            id="title"
            onBlur={onBlur}
            defaultValue={title}
            className="h-7 truncate border-transparent bg-transparent text-sm font-medium transition hover:border-input focus:border-input focus:bg-white"
            errors={fieldErrors}
          />
        </form>
      </div>
    )
  }

  return (
    <div className="flex items-start justify-between gap-x-2 px-2 pt-2 font-semibold">
      <div
        onClick={enableEditing}
        role="button"
        className="h-7 w-full border-transparent px-3 py-1 text-sm font-medium"
      >
        {list.title}
      </div>
      <ListHeaderActions list={list} onAddCard={console.log} />
    </div>
  )
}
