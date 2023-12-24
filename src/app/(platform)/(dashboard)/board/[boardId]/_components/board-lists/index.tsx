'use client'

import { useEffect, useState } from 'react'

import { ListWithCards } from '@/types/db'

import { CreateListForm } from './create-list-form'
import { List } from './list'

type ListContainer = {
  boardId: string
  lists: ListWithCards[]
}

export const BoardLists = ({ boardId, lists }: ListContainer) => {
  const [orderedLists, setOrderedLists] = useState(lists)

  useEffect(() => {
    setOrderedLists(lists)
  }, [lists])

  return (
    <ol className="flex h-full gap-x-3">
      {orderedLists.map((list, index) => {
        return <List key={index} index={index} list={list} />
      })}
      <CreateListForm />
      <div className="w-1 flex-shrink-0" />
    </ol>
  )
}
