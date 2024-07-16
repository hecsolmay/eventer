'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DateValue } from '@internationalized/date'
import {
  Button,
  ButtonProps,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea
} from '@nextui-org/react'
import { EVENT_STATE } from '@prisma/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import SelectStatus from '../select-status'

import { createEvent, updateEventById } from '@/actions/events'
import { DateInputWithHours } from '@/components/date-picker'
import InputGuests from '@/components/input-guests'
import { LeafletMap } from '@/components/map'
import { DEFAULT_LAT, DEFAULT_LNG } from '@/constants'
import { createEventFormSchema, CreateEventFormSchema } from '@/schemas/events'
import { Cords } from '@/types'
import { EventType } from '@/types/events'
import {
  DateValueToDate,
  getNowDateValue,
  parseDateToDateValue
} from '@/utils/time'

interface ModalProps {
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void | undefined
}

interface DefaultValues {
  lat: number
  lng: number
  eventDate: DateValue
  state: EVENT_STATE
  name: string
  description: string
  isFree: boolean
  guests: string[]
  eventId?: string
}

const INITIAL_DEFAULT_VALUES: DefaultValues = {
  lat: DEFAULT_LAT,
  lng: DEFAULT_LNG,
  eventDate: getNowDateValue(),
  state: 'ACTIVE',
  name: '',
  description: '',
  isFree: false,
  guests: []
}

interface CommonEventModalProps extends ModalProps {
  action?: 'CREATE' | 'EDIT'
  defaultValues?: DefaultValues
}

function CommonEventModal ({
  isOpen = false,
  onOpenChange = () => {},
  action = 'CREATE',
  defaultValues = INITIAL_DEFAULT_VALUES
}: CommonEventModalProps) {
  const [guests, setGuests] = useState<string[]>([])
  const [markerPosition, setMarkerPosition] = useState<Cords>({
    lat: defaultValues.lat,
    lng: defaultValues.lng
  })

  const [dateValue, setDateValue] = useState<DateValue>(defaultValues.eventDate)
  const [isSending, setIsSending] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<EVENT_STATE>(
    defaultValues.state
  )

  const {
    handleSubmit,
    reset: resetForm,
    register,
    formState: { errors, isSubmitting }
  } = useForm<CreateEventFormSchema>({
    defaultValues: {
      name: defaultValues.name,
      description: defaultValues.description,
      isFree: defaultValues.isFree
    },
    resolver: zodResolver(createEventFormSchema)
  })

  if (!isOpen) return null

  const createNewEvent = async (data: CreateEventFormSchema) => {
    const newEvent = {
      ...data,
      eventDate: DateValueToDate(dateValue),
      guests,
      lat: markerPosition.lat,
      lng: markerPosition.lng
    }

    const result = await createEvent(newEvent)

    if (!result.success) {
      throw new Error(result.error)
    }
  }

  const updateEvent = async (eventId: string, data: CreateEventFormSchema) => {
    const updateEvent = {
      ...data,
      eventDate: DateValueToDate(dateValue),
      guests,
      lat: markerPosition.lat,
      lng: markerPosition.lng,
      state: selectedStatus
    }

    const result = await updateEventById(eventId, updateEvent)

    if (!result.success) {
      throw new Error(result.error)
    }
  }
  const onSubmit = async (data: CreateEventFormSchema) => {
    setIsSending(true)
    try {
      if (isCreate) {
        await createNewEvent(data)
      } else {
        // TODO: GET EVENT ID
        const eventId = defaultValues.eventId!

        await updateEvent(eventId, data)
      }

      const successMessage = isCreate
        ? 'Evento creado exitosamente'
        : 'Evento actualizado exitosamente'

      toast.success(successMessage)
      isCreate && reset()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      const errorMessage = isCreate
        ? 'Algo salió mal al crear el evento'
        : 'Algo salió mal al actualizar el evento'

      toast.error(errorMessage)
    } finally {
      setIsSending(false)
    }
  }

  const isCreate = action === 'CREATE'

  const reset = () => {
    setGuests([])
    resetForm()
  }

  return (
    <Modal
      isOpen={isOpen}
      placement='center'
      scrollBehavior='inside'
      onOpenChange={onOpenChange}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {isCreate ? 'Crea tu evento' : 'Editar evento'}
              </ModalHeader>
              <ModalBody className='scroll-small'>
                <Input
                  label='Nombre del evento'
                  placeholder='Escribe el nombre del evento'
                  variant='bordered'
                  {...register('name')}
                  errorMessage={errors.name?.message}
                  isInvalid={!!errors.name}
                />
                <Textarea
                  label='Descripción del evento'
                  placeholder='Escribe una descripción del evento'
                  variant='bordered'
                  {...register('description')}
                  errorMessage={errors.description?.message}
                  isInvalid={!!errors.description}
                />

                <InputGuests guests={guests} setGuests={setGuests} />

                <DateInputWithHours value={dateValue} onChange={setDateValue} />

                {!isCreate && (
                  <SelectStatus
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                  />
                )}

                <LeafletMap
                  changeMarkerPosition={setMarkerPosition}
                  lat={markerPosition.lat}
                  lng={markerPosition.lng}
                />

                <Checkbox {...register('isFree')} defaultSelected>
                  gratuito
                </Checkbox>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  type='button'
                  variant='flat'
                  onPress={() => {
                    reset()
                    onClose()
                  }}
                >
                  Cerrar
                </Button>
                <Button
                  color={isCreate ? 'primary' : 'warning'}
                  isLoading={isSubmitting || isSending}
                  type='submit'
                >
                  {isCreate ? 'Crear' : 'Editar'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </form>
    </Modal>
  )
}

interface CreateEventModalProps extends ModalProps {}

export function CreateEventModal ({
  isOpen = false,
  onOpenChange = () => {}
}: CreateEventModalProps) {
  return (
    <CommonEventModal
      action='CREATE'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    />
  )
}

interface EditEventModalProps extends ModalProps {
  event: EventType
}

export function EditEventModal ({
  isOpen = false,
  onOpenChange = () => {},
  event
}: EditEventModalProps) {
  if (!isOpen) return null

  return (
    <CommonEventModal
      action='EDIT'
      defaultValues={{
        description: event.description,
        eventDate: parseDateToDateValue(event.eventDate),
        guests: event.guests,
        isFree: event.isFree,
        lat: event.lat,
        lng: event.lng,
        name: event.name,
        state: event.state,
        eventId: event.id
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    />
  )
}

interface AlertModalProps extends ModalProps {
  title?: string
  description?: string
  cancelText?: string
  confirmText?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | undefined
  buttonColor?: ButtonProps['color']
  isLoading?: boolean
}

export function AlertModal ({
  isOpen,
  onOpenChange,
  cancelText = 'Cancelar',
  confirmText = 'Confirmar',
  onConfirm = () => {},
  onCancel = () => {},
  title = 'Título de alerta',
  description = 'Descripción de alerta',
  buttonColor,
  isLoading = false
}: AlertModalProps) {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} size='xl' onOpenChange={onOpenChange}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
            <ModalBody>
              <p>{description}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color='primary'
                variant='light'
                onPress={() => {
                  onCancel()
                  onClose()
                }}
              >
                {cancelText}
              </Button>
              <Button
                color={buttonColor}
                isLoading={isLoading}
                onPress={async () => {
                  if (isLoading) return
                  await onConfirm()
                }}
              >
                {confirmText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
