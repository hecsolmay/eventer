'use server'

import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'

import { getUserSession } from '@/utils/auth'
import { EventsService } from '@/services/events'
import { EventsUsersService } from '@/services/events-users'
import { CreateEventSchema } from '@/schemas/events'
import { EventUpdateDTO } from '@/types/events'

type ActionResponse =
  | {
      success: true
    }
  | {
      success: false
      error: string
    }

export async function registerUserToEvent (
  eventId: string
): Promise<ActionResponse> {
  try {
    const session = await getUserSession()

    if (session === null) {
      redirect('/login')
    }

    const existedEvent = await EventsService.getEvent(eventId)

    if (existedEvent === null) {
      return {
        success: false,
        error: 'Evento no existe'
      }
    }

    await EventsUsersService.createEventUser(eventId, session.id)
    revalidateTag('events')

    return {
      success: true
    }
  } catch (error) {
    return {
      success: false,

      error: 'Algo salió mal'
    }
  }
}

export async function deleteUserFromEvent (
  eventId: string
): Promise<ActionResponse> {
  try {
    const session = await getUserSession()

    if (session === null) {
      redirect('/login')
    }

    const existedEvent = await EventsService.getEvent(eventId)

    if (existedEvent === null) {
      return {
        success: false,
        error: 'Evento no existe'
      }
    }

    await EventsUsersService.deleteEventUser(eventId, session.id)
    revalidateTag('events')

    return {
      success: true
    }
  } catch (error) {
    return {
      success: false,

      error: 'Algo salió mal'
    }
  }
}

export async function getIsUserRegisteredToEvent (
  eventId: string
): Promise<boolean> {
  try {
    const session = await getUserSession()

    if (session === null) {
      redirect('/login')
    }

    const existedEvent = await EventsService.getEvent(eventId)

    if (existedEvent === null) {
      return false
    }

    const isRegistered = await EventsUsersService.isEventUserRegistered(
      eventId,
      session.id
    )

    return isRegistered
  } catch (error) {
    return false
  }
}

export async function createEvent (
  newEvent: Omit<CreateEventSchema, 'authorId'>
): Promise<ActionResponse> {
  try {
    const session = await getUserSession()

    if (session === null) {
      redirect('/login')
    }

    await EventsService.createEvent({ ...newEvent, authorId: session.id })
    revalidateTag('events')

    return {
      success: true
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)

    return {
      success: false,
      error: 'Algo salió mal'
    }
  }
}

export async function deleteEvent (eventId: string): Promise<ActionResponse> {
  try {
    const result = await EventsService.deleteEvent(eventId)

    if (result === null) {
      return {
        success: false,
        error: 'Evento no existe'
      }
    }

    revalidateTag('events')

    return {
      success: true
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)

    return {
      success: false,
      error: 'Algo salió mal'
    }
  }
}

export async function updateEventById (
  eventId: string,
  event: EventUpdateDTO
): Promise<ActionResponse> {
  try {
    const session = await getUserSession()

    if (session === null) {
      redirect('/login')
    }

    await EventsService.updateEvent(eventId, { ...event, authorId: session.id })
    revalidateTag('events')

    return {
      success: true
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)

    return {
      success: false,
      error: 'Algo salió mal'
    }
  }
}
