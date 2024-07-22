'use server'

import { revalidateTag } from 'next/cache'

import { EventsUsersService } from '@/services/events-users'

export async function getEventAssistants (eventId: string) {
  const result = await EventsUsersService.getEventUsers(eventId)

  return result
}

export async function removeAssistantFromEvent (
  eventId: string,
  assistantId: string
) {
  try {
    await EventsUsersService.deleteEventUser(
      eventId,
      assistantId
    )

    revalidateTag('user-events')

    return {
      success: true
    }
  } catch (error) {
    return {
      success: false
    }
  }
}
