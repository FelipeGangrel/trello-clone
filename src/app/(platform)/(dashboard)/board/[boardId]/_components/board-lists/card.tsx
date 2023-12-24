import type { Card as CardModel } from '@prisma/client'

type ListCardProps = {
  index: number
  card: CardModel
}

export const Card = ({ index, card }: ListCardProps) => {
  return (
    <div
      role="button"
      className="truncate rounded-md border-2 border-transparent bg-card px-3 py-2 text-sm shadow-sm hover:border-black"
    >
      {card.title}
    </div>
  )
}
