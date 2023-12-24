import { List } from '@prisma/client'
import { z } from 'zod'

import type { ActionState } from '@/lib/create-safe-action'
import { ListWithCards } from '@/types/db'

import { DuplicateList } from './schema'

export type InputType = z.infer<typeof DuplicateList>
export type ReturnType = ActionState<InputType, ListWithCards>
