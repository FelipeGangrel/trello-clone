'use client'

import { List, PlusIcon, XIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import type { ElementRef } from 'react'
import { useRef, useState } from 'react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { FormField, SubmitButton } from '@/components/form'
import { Button } from '@/components/ui'

import { ListWrapper } from './list-wrapper'

export const ListForm = () => {
  const params = useParams<{ boardId: string }>()

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const [isEditing, setIsEditing] = useState(false)

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

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          className="w-full space-y-4 rounded-md bg-white p-3 shadow-md"
        >
          <FormField
            ref={inputRef}
            id="title"
            placeholder="Enter list title..."
            className="h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input"
          />
          <input type="hidden" id="boardId" value={params.boardId} />
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
        className="flex w-full items-center rounded-md bg-white/80 p-3 py-4 text-sm font-medium transition hover:bg-white/50"
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        <span>Add a list</span>
      </button>
    </ListWrapper>
  )
}
