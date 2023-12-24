'use client'

import { List } from '@prisma/client'

type ListItemHeader = {
  list: List
}

export const ListItemHeader = ({ list }: ListItemHeader) => {
  return (
    <div className="flex items-start justify-between gap-x-2 px-2 pt-2 font-semibold">
      <div className="h-7 w-full border-transparent px-3 py-1 text-sm font-medium">
        {list.title}
      </div>
    </div>
  )
}
