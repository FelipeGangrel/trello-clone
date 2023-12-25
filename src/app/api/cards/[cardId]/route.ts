import { auth } from '@clerk/nextjs'
import { set } from 'lodash'
import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/lib/db'

type Params = {
  cardId: string
}

function fakeTimeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
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

    await fakeTimeout(1000)

    return NextResponse.json(card)
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
