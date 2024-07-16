'use client'

import { Button } from '@nextui-org/button'
import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { toast } from 'sonner'

import {
  deleteEvent,
  deleteUserFromEvent,
  registerUserToEvent
} from '@/actions/events'
import { AlertModal, CreateEventModal } from '@/components/events/modal'
import { PencilIcon, TrashIcon } from '@/components/icons'
import { EventType } from '@/types/events'

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
    <Button
      className='w-full sm:w-auto'
      color='secondary'
      isLoading={isSubmitting}
      onClick={handleClick}
    >
      {text}
    </Button>
  )
}

export function CreateEventButton () {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button className='w-full sm:w-auto' color='secondary' onPress={onOpen}>
        Crear evento
      </Button>
      <CreateEventModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}

interface EditEventButtonProps {
  event: EventType
}

export function EditEventButton ({ event }: EditEventButtonProps) {
  return (
    <Button isIconOnly color='warning' title={`Editar ${event.name}`}>
      <PencilIcon className='size-6 text-white' />
    </Button>
  )
}

interface DeleteEventButtonProps {
  event: EventType
}

export function DeleteEventButton ({ event }: DeleteEventButtonProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = async () => {
    setIsSubmitting(true)
    try {
      const result = await deleteEvent(event.id)

      if (!result.success) {
        toast.error(result.error)

        return
      }

      toast.success('Evento eliminado exitosamente')
      onClose()
    } catch (error) {
      toast.error('Algo salió mal al eliminar el evento')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <AlertModal
        buttonColor='danger'
        confirmText='Eliminar'
        description={
          '¿Estás seguro de que quieres eliminar el evento, después de eliminar el evento no podrás acceder a él?'
        }
        isOpen={isOpen}
        title='Eliminar evento'
        onConfirm={handleConfirm}
        onOpenChange={onOpenChange}
      />
      <Button
        isIconOnly
        color='danger'
        isLoading={isSubmitting}
        title={`Eliminar ${event.name}`}
        onPress={onOpen}
      >
        <TrashIcon className='size-6 text-white' />
      </Button>
    </>
  )
}
