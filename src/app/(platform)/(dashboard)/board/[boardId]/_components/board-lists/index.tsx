'use client'

import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from '@hello-pangea/dnd'
import { useCallback, useEffect, useState } from 'react'

import { ListWithCards } from '@/types/db'

import { CreateListForm } from './create-list-form'
import { List } from './list'

type ListContainer = {
  boardId: string
  lists: ListWithCards[]
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const BoardLists = ({ boardId, lists }: ListContainer) => {
  const [orderedLists, setOrderedLists] = useState(lists)

  useEffect(() => {
    setOrderedLists(lists)
  }, [lists])

  const onDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      const { destination, source, type } = result

      if (!destination) {
        return
      }

      // if dropped in the same position
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return
      }

      // if user moves a list
      if (type === 'list') {
        const items = reorder(
          orderedLists,
          source.index,
          destination.index
        ).map((item, index) => ({ ...item, order: index }))

        setOrderedLists(items)
        // TODO: update order in db
      }

      // if user moves a card
      if (type === 'card') {
        let newOrderedLists = [...orderedLists]

        // source and destination list
        const sourceList = newOrderedLists.find(
          (list) => list.id === source.droppableId
        )
        const destinationList = newOrderedLists.find(
          (list) => list.id === destination.droppableId
        )

        // if don't have source or destination list
        if (!sourceList || !destinationList) {
          return
        }

        // check if card exists in the source list
        if (!sourceList.cards) {
          sourceList.cards = []
        }

        // check if card exists in the destination list
        if (!destinationList.cards) {
          destinationList.cards = []
        }

        // moving the card in the same list
        if (source.droppableId === destination.droppableId) {
          const reorderedCards = reorder(
            sourceList.cards,
            source.index,
            destination.index
          )

          reorderedCards.forEach((card, index) => {
            card.order = index
          })

          sourceList.cards = reorderedCards

          setOrderedLists(newOrderedLists)
          // TODO: update order in db

          // user moves the card to another list
        } else {
          // remove card from the source list
          const [movedCard] = sourceList.cards.splice(source.index, 1)

          // assign the card to the destination list
          movedCard.listId = destination.droppableId

          // add the card to the destination list
          destinationList.cards.splice(destination.index, 0, movedCard)

          // update order in the source list
          sourceList.cards.forEach((card, index) => {
            card.order = index
          })

          // update order in the destination list
          destinationList.cards.forEach((card, index) => {
            card.order = index
          })

          setOrderedLists(newOrderedLists)
          // TODO: update order in db
        }
      }
    },
    [orderedLists]
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full gap-x-3"
          >
            {orderedLists.map((list, index) => (
              <List key={list.id} index={index} list={list} />
            ))}
            {provided.placeholder}
            <CreateListForm />
            <div className="w-1 flex-shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
