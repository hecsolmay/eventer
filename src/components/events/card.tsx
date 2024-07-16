import Link from 'next/link'

import { CalendarIcon, ClockIcon, MapPinIcon } from '../icons'

import { DeleteEventButton, EditEventButton } from './buttons-client'

import { EventType } from '@/types/events'
import { cn } from '@/utils/cn'
import { formatEventDate, formatEventTime } from '@/utils/time'

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {}

function Card ({ className, ...props }: DivProps) {
  return (
    <div
      {...props}
      className={cn(
        'w-full md:max-w-sm rounded-lg border shadow-sm',
        className
      )}
    />
  )
}

function CardHeader ({ className, ...props }: DivProps) {
  return (
    <div
      {...props}
      className={cn(
        'bg-gray-100 dark:bg-[#1e1e1e] rounded-t-lg flex flex-col space-y-1.5 p-6',
        className
      )}
    />
  )
}

function CardTitle ({ className, children, ...props }: DivProps) {
  return (
    <h3
      {...props}
      className={cn(
        'whitespace-nowrap text-2xl font-bold tracking-tight truncate',
        className
      )}
    >
      {children}
    </h3>
  )
}

function CardContent ({ className, ...props }: DivProps) {
  return <div {...props} className={cn('p-6 h-40 text-ellipsis', className)} />
}

interface EventDetailProps extends DivProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  iconClassName?: string
}

function EventDetail ({
  icon: Icon,
  iconClassName,
  className,
  children,
  ...props
}: EventDetailProps) {
  return (
    <div
      {...props}
      className={cn('text-muted-foreground flex items-center gap-2', className)}
    >
      <Icon className={cn('size-5', iconClassName)} />
      <span className='line-clamp-1'>{children}</span>
    </div>
  )
}

interface EventCardProps {
  event: EventType
}

export function EventCard ({ event }: EventCardProps) {
  const { name, description, eventDate, lat, lng } = event

  const localization = `${lat}, ${lng}`

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <EventDetail icon={CalendarIcon}>
          {formatEventDate(eventDate)}
        </EventDetail>
        <EventDetail icon={ClockIcon}>{formatEventTime(eventDate)}</EventDetail>
        <EventDetail icon={MapPinIcon}>{localization}</EventDetail>
      </CardHeader>
      <CardContent>
        <p className='line-clamp-4'>{description}</p>
      </CardContent>
    </Card>
  )
}

export function EventUserCard ({ event }: EventCardProps) {
  const { name, description, eventDate, lat, lng } = event

  const localization = `${lat}, ${lng}`

  return (
    <Card>
      <Link href={`/events/${event.id}`}>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <EventDetail icon={CalendarIcon}>
            {formatEventDate(eventDate)}
          </EventDetail>
          <EventDetail icon={ClockIcon}>
            {formatEventTime(eventDate)}
          </EventDetail>
          <EventDetail icon={MapPinIcon}>{localization}</EventDetail>
        </CardHeader>
      </Link>
      <CardContent className='flex h-44 flex-col gap-3 pb-2'>
        <p className='line-clamp-4 flex-1'>{description}</p>

        <div className='flex justify-end gap-2'>
          <EditEventButton event={event} />
          <DeleteEventButton event={event} />
        </div>
      </CardContent>
    </Card>
  )
}
