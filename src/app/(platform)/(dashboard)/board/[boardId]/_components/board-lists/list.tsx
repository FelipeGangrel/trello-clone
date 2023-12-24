'use client'

import type { ElementRef } from 'react'
import { useRef, useState } from 'react'

import { ListWithCards } from '@/types/db'

import { CreateCardForm } from './create-card-form'
import { ListHeader } from './list-header'

type ListProps = {
  index: number
  list: ListWithCards
}

export const List = ({ index, list }: ListProps) => {
  const textareaRef = useRef<ElementRef<'textarea'>>(null)

  const [isEditing, setIsEditing] = useState(false)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    }, 0)
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onAddCard = () => {
    console.log('onAddCard')
  }

  return (
    <li className="h-full w-72 shrink-0 select-none">
      <div className="w-full rounded-md bg-slate-50 pb-2 shadow-md">
        <ListHeader list={list} onAddCard={onAddCard} />
        <CreateCardForm
          ref={textareaRef}
          listId={list.id}
          isEditing={isEditing}
          onEnableEditing={enableEditing}
          onDisableEditing={disableEditing}
        />
      </div>
    </li>
  )
}
