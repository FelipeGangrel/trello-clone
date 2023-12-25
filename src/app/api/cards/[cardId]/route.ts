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

    const card = await db.card.findUnique({
      where: {
        id: params.cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: true,
      },
    })

    return NextResponse.json(card)
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
