import Pagination from '@/components/pagination'
import { EventCard } from '@/components/events/card'
import { cn } from '@/utils/cn'
import { EventsService } from '@/services/events'

interface ListOfEventsProps extends React.HTMLAttributes<HTMLDivElement> {
  hidePagination?: boolean
}

export async function ListOfEvents ({
  hidePagination = false,
  className,
  ...props
}: ListOfEventsProps) {
  const { events, info } = await EventsService.getEvents()

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
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {!hidePagination && <Pagination info={info} />}
    </>
  )
}
