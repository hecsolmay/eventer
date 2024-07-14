import { Prisma } from '@prisma/client'

import { DateValueToDate, getParsedDateValue } from '../time'

import { EventsFilterParams } from '@/types/events'
import { SearchParams } from '@/types'

export function getWhereEventsFilter (query?: EventsFilterParams): Prisma.EventsWhereInput {
  const where: Prisma.EventsWhereInput = {}

  if (query?.name !== undefined) {
    where.name = { contains: query.name, mode: 'insensitive' }
  }

  if (query?.eventDate !== undefined) {
    where.eventDate = {
      gte: query.eventDate
    }
  }

  return where
}

export function searchParamsToEventsFilter (searchParams?: SearchParams): EventsFilterParams {
  const params: EventsFilterParams = {}

  if (searchParams === undefined) {
    return params
  }

  if (searchParams.date !== undefined) {
    const rawDate = getParsedDateValue(searchParams.date)
    const formattedDate = DateValueToDate(rawDate)

    params.eventDate = formattedDate
  }

  if (searchParams.q !== undefined) {
    params.name = searchParams.q
  }

  if (searchParams.limit !== undefined) {
    params.limit = searchParams.limit
  }

  if (searchParams.page !== undefined) {
    params.page = searchParams.page
  }

  return params
}