import { auth } from '@clerk/nextjs'

import { MAX_FREE_BOARDS } from '@/constants/boards'

import { db } from './db'

export async function increaseBoardsCount() {
  const { orgId } = auth()

  if (!orgId) {
    throw new Error('Unauthorized')
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  })

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count + 1 },
    })
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    })
  }
}

export async function decreaseBoardsCount() {
  const { orgId } = auth()

  if (!orgId) {
    throw new Error('Unauthorized')
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  })

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 },
    })
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    })
  }
}

export async function hasAvailableCount() {
  const { orgId } = auth()

  if (!orgId) {
    throw new Error('Unauthorized')
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  })

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true
  } else {
    return false
  }
}

export async function getBoardsCount() {
  const { orgId } = auth()

  if (!orgId) {
    return 0
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  })

  if (!orgLimit) {
    return 0
  }

  return orgLimit.count
}
