import { EVENT_STATE } from '@prisma/client'

import { EventsService } from '@/services/events'
import { SortFilter } from '@/types'

export interface EventsFilterParams {
  page?: number | string
  limit?: number | string
  name?: string
  eventDate?: Date
  status?: EVENT_STATE
  sort?: SortFilter
  authorId?: string
}

export interface EventCreateDTO {
  name: string
  description: string
  guests: string[]
  eventDate: Date
  eventTime: string
  isFree: boolean
  lat: number
  lng: number
  authorId: string
}

export interface EventUpdateDTO extends Partial<EventCreateDTO> {
  state: EVENT_STATE
}

export type EventType  = NonNullable<Awaited<ReturnType<typeof EventsService.getEvent>>>
