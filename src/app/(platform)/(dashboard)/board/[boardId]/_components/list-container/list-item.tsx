'use client'

import { ListWithCards } from '@/types/db'

import { ListItemHeader } from './list-item-header'

type ListItemProps = {
  index: number
  list: ListWithCards
}

export const ListItem = ({ index, list }: ListItemProps) => {
  return (
    <li className="h-full w-72 shrink-0 select-none">
      <div className="w-full rounded-md bg-slate-50 pb-2 shadow-md">
        <ListItemHeader list={list} />
      </div>
    </li>
  )
}
