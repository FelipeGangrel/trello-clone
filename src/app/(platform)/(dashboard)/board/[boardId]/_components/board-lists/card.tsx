import { Draggable } from '@hello-pangea/dnd'
import type { Card as CardModel } from '@prisma/client'

import { useCardModal } from '@/hooks/use-card-modal'
import { cn } from '@/lib/utils'

type ListCardProps = {
  index: number
  card: CardModel
}

export const Card = ({ index, card }: ListCardProps) => {
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
