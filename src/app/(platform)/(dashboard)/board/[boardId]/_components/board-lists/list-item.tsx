'use client'

import { Draggable, Droppable } from '@hello-pangea/dnd'
import type { ElementRef } from 'react'
import { useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { ListWithCards } from '@/types/db'

import { CardItem } from './card-item'
import { CreateCardForm } from './create-card-form'
import { ListHeader } from './list-header'

type ListItemProps = {
  index: number
  list: ListWithCards
}

export const ListItem = ({ index, list }: ListItemProps) => {
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

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided, snapshot) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="h-full w-72 shrink-0 select-none"
        >
          <div
            {...provided.dragHandleProps}
            className={cn(
              'w-full rounded-md bg-slate-50 pb-2 shadow-sm',
              snapshot.isDragging && 'shadow-md'
            )}
          >
            <ListHeader list={list} onAddCard={enableEditing} />
            <Droppable droppableId={list.id} type="card">
              {(provided) => (
                <ol
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={cn(
                    'mx-1 flex flex-col gap-y-2 px-1 py-0.5',
                    list.cards.length > 0 ? 'mt-2' : 'mt-0'
                  )}
                >
                  {list.cards.map((card, index) => (
                    <CardItem key={card.id} index={index} card={card} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CreateCardForm
              ref={textareaRef}
              listId={list.id}
              isEditing={isEditing}
              onEnableEditing={enableEditing}
              onDisableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  )
}
