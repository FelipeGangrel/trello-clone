import type { Board } from '@prisma/client'
import { z } from 'zod'

import type { ActionState } from '@/lib/create-safe-action'

import { CreateBoard } from './schema'

export type InputType = z.infer<typeof CreateBoard>
export type ReturnType = ActionState<InputType, Board>
