'use server'

import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'

import { getUserSession } from '@/utils/auth'
import { EventsService } from '@/services/events'
import { EventsUsersService } from '@/services/events-users'

type RegisterUserToEventResponse =
  | {
      success: true
    }
  | {
      success: false
      error: string
    }

export async function registerUserToEvent (
  eventId: string
): Promise<RegisterUserToEventResponse> {
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
): Promise<RegisterUserToEventResponse> {
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

export async function getIsUserRegisteredToEvent (eventId: string): Promise<boolean> {
  try {
    const session = await getUserSession()

    if (session === null) {
      redirect('/login')
    }

    const existedEvent = await EventsService.getEvent(eventId)

    if (existedEvent === null) {
      return false
    }

    const isRegistered = await EventsUsersService.isEventUserRegistered(eventId, session.id)

    return isRegistered
  } catch (error) {
    return false
  }
}