'use client'

import { List, PlusIcon, XIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import type { ElementRef } from 'react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { createList } from '@/actions/create-list'
import { FormField, SubmitButton } from '@/components/form'
import { Button } from '@/components/ui'
import { useAction } from '@/hooks'

import { ListWrapper } from './list-wrapper'

export const CreateListForm = () => {
  const params = useParams<{ boardId: string }>()
  const router = useRouter()

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const [isEditing, setIsEditing] = useState(false)

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (list) => {
      toast.success(`List "${list.title}" created`)
      disableEditing()
      router.refresh()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const handleFormAction = (formData: FormData) => {
    const boardId = formData.get('boardId') as string
    const title = formData.get('title') as string

    execute({ boardId, title })
  }

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          action={handleFormAction}
          className="w-full space-y-4 rounded-md bg-white/90 p-3 shadow-md backdrop-blur-md"
        >
          <FormField
            id="title"
            ref={inputRef}
            errors={fieldErrors}
            placeholder="Enter list title..."
            className="h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input"
          />
          <input type="hidden" name="boardId" defaultValue={params.boardId} />
          <div className="flex items-center gap-x-1">
            <SubmitButton variant="brand" className="w-full">
              Add list
            </SubmitButton>
            <Button size="icon" variant="ghost" onClick={disableEditing}>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="flex w-full items-center rounded-md bg-white/90 p-3 text-sm font-medium backdrop-blur-md transition hover:bg-white/50"
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        <span>Add a list</span>
      </button>
    </ListWrapper>
  )
}
