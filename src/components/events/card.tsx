import { CalendarIcon, ClockIcon, MapPinIcon } from '../icons'

import { EventType } from '@/types/events'
import { cn } from '@/utils/cn'
import { formatEventDate } from '@/utils/time'

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {}

function Card ({ className, ...props }: DivProps) {
  return (
    <div
      {...props}
      className={cn('w-full max-w-sm rounded-lg border shadow-sm', className)}
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
      <span>{children}</span>
    </div>
  )
}

interface EventCardProps {
  event: EventType
}

export function EventCard ({ event }: EventCardProps) {
  const { name, description, eventDate, eventTime, lat, lng } = event

  const localization = `${lat}, ${lng}`

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <EventDetail icon={CalendarIcon}>
          {formatEventDate(eventDate)}
        </EventDetail>
        <EventDetail icon={ClockIcon}>{eventTime}</EventDetail>
        <EventDetail icon={MapPinIcon}>{localization}</EventDetail>
      </CardHeader>
      <CardContent>
        <p className='line-clamp-4'>{description}</p>
      </CardContent>
    </Card>
  )
}
