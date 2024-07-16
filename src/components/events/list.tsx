import Link from 'next/link'

import { CreateEventButton } from '@/components/events/buttons-client'
import { EventCard, EventUserCard } from '@/components/events/card'
import {
  EmptyListOfEvents,
  EmptyListOfUserEvents
} from '@/components/fallbacks/events'
import Pagination from '@/components/pagination'
import { EventsService } from '@/services/events'
import { SearchParams, SearchParamsPrivate } from '@/types'
import { EventsFilterParams } from '@/types/events'
import { cn } from '@/utils/cn'
import {
  searchParamsPrivateToEventsFilter,
  searchParamsToEventsFilter
} from '@/utils/filters/events'

interface ListOfEventsProps extends React.HTMLAttributes<HTMLDivElement> {
  hidePagination?: boolean
  searchParams?: SearchParams | SearchParamsPrivate
}

export async function ListOfEvents ({
  hidePagination = false,
  className,
  searchParams,
  ...props
}: ListOfEventsProps) {
  const params: EventsFilterParams = searchParamsToEventsFilter(searchParams)

  const { events, info } = await EventsService.getEvents(params)

  if (events.length === 0) {
    return <EmptyListOfEvents />
  }

  return (
    <>
      <div
        {...props}
        className={cn(
          'grid grid-cols-[repeat(auto-fill,minmax(305px,1fr))] gap-x-4 gap-y-8 xl:grid-cols-4',
          className
        )}
      >
        {events.map(event => (
          <Link key={event.id} href={`/events/${event.id}`}>
            <EventCard event={event} />
          </Link>
        ))}
      </div>
      {!hidePagination && <Pagination info={info} />}
    </>
  )
}

export async function ListOfUserEvents ({
  hidePagination = false,
  className,
  searchParams,
  ...props
}: ListOfEventsProps) {
  const params: EventsFilterParams =
    searchParamsPrivateToEventsFilter(searchParams)

  const { events, info } = await EventsService.getEvents(params)

  if (events.length === 0) {
    return <EmptyListOfUserEvents />
  }

  return (
    <>
      <div className='my-6 flex justify-end'>
        <CreateEventButton />
      </div>
      <div
        {...props}
        className={cn(
          'grid grid-cols-[repeat(auto-fill,minmax(305px,1fr))] gap-x-4 gap-y-8 xl:grid-cols-4',
          className
        )}
      >
        {events.map(event => (
          <EventUserCard key={event.id} event={event} />
        ))}
      </div>
      {!hidePagination && <Pagination info={info} />}
    </>
  )
}
