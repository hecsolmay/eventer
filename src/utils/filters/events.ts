import { Prisma } from '@prisma/client'

import { DateValueToDate, getParsedDateValue } from '../time'

import { getSortFilter, getStatusFilter } from '.'

import { EventsFilterParams } from '@/types/events'
import { SearchParams, SearchParamsPrivate } from '@/types'

const ONE_DAY_TIME = 24 * 60 * 60 * 1000

export function getWhereEventsFilter (
  query?: EventsFilterParams
): Prisma.EventsWhereInput {
  const where: Prisma.EventsWhereInput = {}

  if (query?.name !== undefined) {
    where.name = { contains: query.name, mode: 'insensitive' }
  }

  if (query?.eventDate !== undefined) {
    const currentDatefilter = query.eventDate
    const onDayAfterFilter = new Date(
      currentDatefilter.getTime() + ONE_DAY_TIME
    )

    where.eventDate = {
      gte: currentDatefilter,
      lt: onDayAfterFilter
    }
  }

  if (query?.status !== undefined) {
    where.state = { equals: query.status }
  }

  if (query?.authorId !== undefined) {
    where.authorId = { equals: query.authorId }
  }

  if (query?.userId !== undefined) {
    where.userEvents = { some: { userId: query.userId } }
  }

  return where
}

export function getOrderByEventsFilter (
  params?: EventsFilterParams
): Prisma.EventsOrderByWithRelationInput {
  const orderBy: Prisma.EventsOrderByWithRelationInput | undefined = {}

  orderBy.eventDate = 'desc'

  if (params?.sort !== undefined) {
    const sort = params.sort

    if (sort === 'event-asc') {
      orderBy.eventDate = 'asc'
    }

    if (sort === 'event-desc') {
      orderBy.eventDate = 'desc'
    }
  }

  return orderBy
}
export function searchParamsToEventsFilter (
  searchParams?: SearchParams
): EventsFilterParams {
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

  if (searchParams.status !== undefined) {
    params.status = getStatusFilter(searchParams.status)
  }

  if (searchParams.sort !== undefined) {
    params.sort = getSortFilter(searchParams.sort)
  }

  return params
}

export function searchParamsPrivateToEventsFilter (
  searchParams?: SearchParamsPrivate
): EventsFilterParams {
  const params = searchParamsToEventsFilter(searchParams)

  if (searchParams?.authorId !== undefined) {
    params.authorId = searchParams.authorId
  }

  if (searchParams?.userId !== undefined) {
    params.userId = searchParams.userId
  }

  return params
}