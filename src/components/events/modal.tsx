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

import { DateInputWithHours } from '@/components/date-picker'
import InputGuests from '@/components/input-guests'
import { LeafletMap } from '@/components/map'
import { Cords } from '@/types'
import { DEFAULT_LAT, DEFAULT_LNG } from '@/constants'

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

  if (!isOpen) return null

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    reset()
    onOpenChange(false)
  }

  const isCreate = action === 'CREATE'

  const reset = () => {
    setGuests([])
  }

  return (
    <Modal
      isOpen={isOpen}
      placement='center'
      scrollBehavior='inside'
      onOpenChange={onOpenChange}
    >
      <form onSubmit={handleSubmit}>
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
                />
                <Textarea
                  label='Descripción del evento'
                  placeholder='Escribe una descripción del evento'
                  variant='bordered'
                />

                <InputGuests guests={guests} setGuests={setGuests} />

                <DateInputWithHours />

                {/* TODO: ADD LOCATION INPUT */}

                <LeafletMap
                  changeMarkerPosition={setMarkerPosition}
                  lat={markerPosition.lat}
                  lng={markerPosition.lng}
                />

                <Checkbox defaultSelected>gratuito</Checkbox>
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
                <Button color={isCreate ? 'primary' : 'warning'} type='submit'>
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
