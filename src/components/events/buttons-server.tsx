import { getIsUserRegisteredToEvent } from '@/actions/events'
import { RegisterEventButton as RegisterEventButtonClient } from '@/components/events/buttons-client'

interface RegisterEventButtonProps {
  eventId: string
}

export async function RegisterEventButton ({
  eventId
}: RegisterEventButtonProps) {
  const isRegistered = await getIsUserRegisteredToEvent(eventId)

  return (
    <RegisterEventButtonClient eventId={eventId} isRegistered={isRegistered} />
  )
}
