import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/lib/db'

type Params = {
  cardId: string
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const logs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: 'CARD',
      },
      orderBy: { createdAt: 'desc' },
      take: 3,
    })

    return NextResponse.json(logs)
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
