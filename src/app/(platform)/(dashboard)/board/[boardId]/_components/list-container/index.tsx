'use client'

import { ListWithCards } from '@/types/db'

import { ListForm } from './list-form'

type ListContainer = {
  boardId: string
  lists: ListWithCards[]
}

export const ListContainer = ({ boardId, lists }: ListContainer) => {
  return (
    <ol>
      <ListForm />
      <div className="w-1 flex-shrink-0" />
    </ol>
  )
}
