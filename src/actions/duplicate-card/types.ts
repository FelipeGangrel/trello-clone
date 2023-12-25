import type { Card } from '@prisma/client'
import { z } from 'zod'

import type { ActionState } from '@/lib/create-safe-action'

import { DuplicateCard } from './schema'

export type InputType = z.infer<typeof DuplicateCard>
export type ReturnType = ActionState<InputType, Card>
