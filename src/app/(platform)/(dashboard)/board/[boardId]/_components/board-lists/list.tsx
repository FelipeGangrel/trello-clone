'use client'

import { ListWithCards } from '@/types/db'

import { ListHeader } from './list-header'

type ListProps = {
  index: number
  list: ListWithCards
}

export const List = ({ index, list }: ListProps) => {
  return (
    <li className="h-full w-72 shrink-0 select-none">
      <div className="w-full rounded-md bg-slate-50 pb-2 shadow-md">
        <ListHeader list={list} />
      </div>
    </li>
  )
}
