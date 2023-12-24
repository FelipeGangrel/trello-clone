import { Draggable } from '@hello-pangea/dnd'
import type { Card as CardModel } from '@prisma/client'

import { cn } from '@/lib/utils'

type ListCardProps = {
  index: number
  card: CardModel
}

export const Card = ({ index, card }: ListCardProps) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className={cn(
            'truncate rounded-md border-2 border-transparent bg-card px-3 py-2 text-sm shadow-sm transition hover:border-black',
            snapshot.isDragging && 'shadow-lg'
          )}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  )
}
