import type { List } from '@prisma/client'
import { z } from 'zod'

import type { ActionState } from '@/lib/create-safe-action'

import { UpdateListsOrder } from './schema'

export type InputType = z.infer<typeof UpdateListsOrder>
export type ReturnType = ActionState<InputType, List[]>
