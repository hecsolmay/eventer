import { Prisma } from '@prisma/client'

import { EventsFilterParams } from '@/types/events'

export function getWhereEventsFilter (query?: EventsFilterParams): Prisma.EventsWhereInput {
  const where: Prisma.EventsWhereInput = {}

  if (query?.name !== undefined) {
    where.name = { contains: query.name, mode: 'insensitive' }
  }

  return where
}