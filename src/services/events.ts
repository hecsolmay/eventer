import { createEventSchema, updateEventSchema } from '@/schemas/events'
import {
  EventCreateDTO,
  EventsFilterParams,
  EventUpdateDTO
} from '@/types/events'
import { SchemaValidationError } from '@/utils/errors'
import {
  getOrderByEventsFilter,
  getWhereEventsFilter
} from '@/utils/filters/events'
import { formatPagination, getPaginationInfo } from '@/utils/pagination'
import prisma from '@/utils/prisma'

export class EventsService {
  static async getEvents (query?: EventsFilterParams) {
    const { page, limit, skip } = formatPagination(query)
    const where = getWhereEventsFilter(query)
    const orderBy = getOrderByEventsFilter(query)

    const resultsPromise = prisma.events.findMany({
      skip,
      orderBy,
      take: limit,
      where
    })

    const countPromise = prisma.events.count({ where })

    const [results, count] = await prisma.$transaction([
      resultsPromise,
      countPromise
    ])

    const info = getPaginationInfo({ page, limit, total: count })

    return {
      events: results,
      info
    }
  }

  static async getEvent (id: string) {
    const event = await prisma.events.findUnique({
      where: {
        id
      }
    })

    return event
  }

  static async createEvent (event: EventCreateDTO) {
    const result = createEventSchema.safeParse(event)

    if (!result.success) {
      throw new SchemaValidationError(result.error.toString())
    }

    const newEvent = await prisma.events.create({
      data: result.data
    })

    return newEvent
  }

  static async updateEvent (id: string, event: EventUpdateDTO) {
    const result = updateEventSchema.safeParse(event)

    if (!result.success) {
      throw new SchemaValidationError(result.error.toString())
    }

    const updatedEvent = await prisma.events.update({
      where: {
        id: id
      },
      data: result.data
    })

    return updatedEvent
  }

  static async deleteEvent (id: string) {
    const foundEvent = await prisma.events.findUnique({
      where: {
        id
      }
    })

    if (!foundEvent) {
      return null
    }

    const deletedEvent = await prisma.events.delete({
      where: {
        id
      }
    })

    return deletedEvent
  }
}
