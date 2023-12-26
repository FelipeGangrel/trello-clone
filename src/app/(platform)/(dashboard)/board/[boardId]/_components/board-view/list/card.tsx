import { Draggable } from '@hello-pangea/dnd'
import type { Card as CardModel } from '@prisma/client'

import { useCardModal } from '@/hooks/use-card-modal'
import { cn } from '@/lib/utils'

type CardItemProps = {
  index: number
  card: CardModel
}

export const Card = ({ index, card }: CardItemProps) => {
  const openModal = useCardModal((state) => state.onOpen)

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => openModal(card.id)}
          className={cn(
            'z-10 truncate rounded-md border-2 border-transparent bg-card px-3 py-2 text-sm shadow-sm transition-colors hover:border-black',
            snapshot.isDragging && 'shadow-md'
          )}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  )
}
