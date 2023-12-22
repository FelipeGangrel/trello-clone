import { PrismaClient } from '@prisma/client'

// global is excluded from hot-reload
declare global {
  var prisma: PrismaClient | undefined
}

const db = globalThis.prisma || new PrismaClient()

// To prevent hot-reload from creating new instances of PrismaClient on each reload while in development
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db
}

export { db }
