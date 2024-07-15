'use client'

import { Button } from '@nextui-org/button'
import { useState } from 'react'

import { deleteUserFromEvent, registerUserToEvent } from '@/actions/events'

interface RegisterEventButtonProps {
  eventId: string
  isRegistered: boolean
}

export function RegisterEventButton ({
  eventId,
  isRegistered
}: RegisterEventButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClick = async () => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      if (isRegistered) {
        await deleteUserFromEvent(eventId)
      } else {
        await registerUserToEvent(eventId)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const text = isRegistered
    ? 'Quitar de la lista'
    : 'Registrarse como Asistente'

  return (
    <Button className='w-full sm:w-auto' color='secondary' isLoading={isSubmitting} onClick={handleClick}>
      {text}
    </Button>
  )
}
