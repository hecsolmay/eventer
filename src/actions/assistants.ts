'use server'

import { EventsUsersService } from '@/services/events-users'

export async function getEventAssistants (eventId: string) {
  const result = await EventsUsersService.getEventUsers(eventId)

  return result
}