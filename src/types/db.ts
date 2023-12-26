import type { Card, List, Task } from '@prisma/client'

export type ListWithCards = List & { cards: Card[] }

export type CardWithRelations = Card & {
  list: List
  tasks: Task[]
}
