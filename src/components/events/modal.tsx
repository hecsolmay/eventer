'use client'

import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea
} from '@nextui-org/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DateValue } from '@internationalized/date'
import { toast } from 'sonner'

import { DateInputWithHours } from '@/components/date-picker'
import InputGuests from '@/components/input-guests'
import { LeafletMap } from '@/components/map'
import { Cords } from '@/types'
import { DEFAULT_LAT, DEFAULT_LNG } from '@/constants'
import { createEventFormSchema, CreateEventFormSchema } from '@/schemas/events'
import { DateValueToDate, getNowDateValue } from '@/utils/time'
import { createEvent } from '@/actions/events'

interface ModalProps {
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void | undefined
}

interface CommonEventModalProps extends ModalProps {
  action?: 'CREATE' | 'EDIT'
  defaultValues?: {
    lat: number
    lng: number
  }
}

function CommonEventModal ({
  isOpen = false,
  onOpenChange = () => {},
  action = 'CREATE',
  defaultValues = { lat: DEFAULT_LAT, lng: DEFAULT_LNG }
}: CommonEventModalProps) {
  const [guests, setGuests] = useState<string[]>([])
  const [markerPosition, setMarkerPosition] = useState<Cords>({
    lat: defaultValues.lat,
    lng: defaultValues.lng
  })

  const [dateValue, setDateValue] = useState<DateValue>(getNowDateValue())
  const [isSending, setIsSending] = useState(false)

  const {
    handleSubmit,
    reset: resetForm,
    register,
    formState: { errors, isSubmitting }
  } = useForm<CreateEventFormSchema>({
    defaultValues: {
      name: '',
      description: '',
      isFree: false
    },
    resolver: zodResolver(createEventFormSchema)
  })

  if (!isOpen) return null

  const onSubmit = async (data: CreateEventFormSchema) => {
    setIsSending(true)
    try {
      const newEvent = {
        ...data,
        eventDate: DateValueToDate(dateValue),
        eventTime: '12:00 PM',
        guests,
        lat: markerPosition.lat,
        lng: markerPosition.lng
      }

      const result = await createEvent(newEvent)

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success('Evento creado exitosamente')
      reset()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      toast.error('Algo salió mal al crear el evento')
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

                {/* TODO: ADD LOCATION INPUT */}

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
