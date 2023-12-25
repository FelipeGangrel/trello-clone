import { z } from 'zod'

import type { ActionState } from '@/lib/create-safe-action'
import type { ListWithCards } from '@/types/db'

import { CopyList } from './schema'

export type InputType = z.infer<typeof CopyList>
export type ReturnType = ActionState<InputType, ListWithCards>
