'use client'

import { useEffect, useState } from 'react'

import { ListWithCards } from '@/types/db'

import { ListForm } from './list-form'
import { ListItem } from './list-item'

type ListContainer = {
  boardId: string
  lists: ListWithCards[]
}

export const ListContainer = ({ boardId, lists }: ListContainer) => {
  const [orderedLists, setOrderedLists] = useState(lists)

  useEffect(() => {
    setOrderedLists(lists)
  }, [lists])

  return (
    <ol className="flex h-full gap-x-3">
      {orderedLists.map((list, index) => {
        return <ListItem key={index} index={index} list={list} />
      })}
      <ListForm />
      <div className="w-1 flex-shrink-0" />
    </ol>
  )
}
