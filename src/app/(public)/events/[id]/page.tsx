import { redirect } from 'next/navigation'

import EventDetail from '@/components/events/details'
import { EventsService } from '@/services/events'
import { ServerPageProps } from '@/types'

export default async function EventDetailPage ({ params }: ServerPageProps) {
  const event = await EventsService.getEvent(params.id)

  if (event === null) {
    redirect('/404')
  }

  return <EventDetail event={event} />
}
