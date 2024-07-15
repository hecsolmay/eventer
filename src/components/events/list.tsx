import Link from 'next/link'

import Pagination from '@/components/pagination'
import { EventCard } from '@/components/events/card'
import { cn } from '@/utils/cn'
import { EventsService } from '@/services/events'
import { EventsFilterParams } from '@/types/events'
import { SearchParams } from '@/types'
import { searchParamsToEventsFilter } from '@/utils/filters/events'

interface ListOfEventsProps extends React.HTMLAttributes<HTMLDivElement> {
  hidePagination?: boolean
  searchParams?: SearchParams
}

export async function ListOfEvents ({
  hidePagination = false,
  className,
  searchParams,
  ...props
}: ListOfEventsProps) {
  const params: EventsFilterParams = searchParamsToEventsFilter(searchParams)

  const { events, info } = await EventsService.getEvents(params)

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
