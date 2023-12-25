import { auth, currentUser } from '@clerk/nextjs'
import type { ACTION, ENTITY_TYPE } from '@prisma/client'

import { db } from './db'

type AuditLogProps = {
  entityId: string
  entityType: ENTITY_TYPE
  entityTitle: string
  action: ACTION
}

export async function createAuditLog(props: AuditLogProps) {
  try {
    const { orgId } = auth()
    const user = await currentUser()

    if (!user || !orgId) {
      throw new Error('User not found')
    }

    const { action, entityId, entityTitle, entityType } = props

    await db.auditLog.create({
      data: {
        action,
        entityId,
        entityTitle,
        entityType,
        orgId,
        userId: user.id,
        userName: [user?.firstName, user?.lastName].join(' '),
        userImage: user?.imageUrl,
      },
    })
  } catch (error) {
    console.log('[AUDIT_LOG_ERROR]', error)
  }
}
