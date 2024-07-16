import { Button } from '@nextui-org/button'
import { Suspense } from 'react'
import { Link } from '@nextui-org/link'

import { RegisterEventButton } from './buttons-server'

import { StatusBadge } from '@/components/events/state-badge'
import { EventType } from '@/types/events'
import { formatEventDate, formatEventTime } from '@/utils/time'

interface EventDetailProps {
  event: EventType
}

export default function EventDetail ({ event }: EventDetailProps) {
  const {
    name,
    description,
    eventDate,
    isFree,
    assistantsCount,
    guests,
    state,
    lat,
    lng,
    localization
  } = event

  return (
    <div className='mx-auto max-w-6xl px-4 pb-8 pt-4 sm:px-6 lg:px-8'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='space-y-6'>
          <div>
            <h1 className='text-3xl font-bold'>{name}</h1>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <DetailSection title='Fecha'>
              <p>{formatEventDate(eventDate)}</p>
            </DetailSection>

            <DetailSection title='Hora'>
              <p>{formatEventTime(eventDate)}</p>
            </DetailSection>

            <DetailSection title='Precio'>
              {isFree ? 'Gratuito' : 'Consulta los precios'}
            </DetailSection>

            <DetailSection title='Ubicación'>
              <p>{localization}</p>
            </DetailSection>
          </div>

          <DetailSection title='Estado del Evento'>
            <StatusBadge status={state} />
          </DetailSection>

          <DetailSection title='Asistentes'>
            <div className='flex items-center gap-2'>
              <span className='relative flex size-8 shrink-0 overflow-hidden rounded-full border'>
                <img
                  alt=''
                  className='aspect-square size-full'
                  src='/assets/images/profile-placeholder.webp'
                />
              </span>
              <span className='text-gray-600 dark:text-gray-200'>
                {`${assistantsCount} asistentes`}
              </span>
            </div>
          </DetailSection>

          <Suspense fallback={<ButtonFallback />}>
            <RegisterEventButton eventId={event.id} />
          </Suspense>
        </div>
        <div className='space-y-6'>
          <h2 className='text-2xl font-bold'>Lista de Invitados</h2>
          <div className='mt-4 grid gap-4'>
            {guests.length === 0 && (
              <p className='text-gray-600 dark:text-gray-200'>
                No hay invitados registrados
              </p>
            )}
            {guests.map((gest, index) => (
              <GestItem key={`${gest}-${index}`} gest={gest} />
            ))}
          </div>
          <div>
            <h2 className='text-2xl font-bold'>Detalles del evento</h2>
            <div className='mt-4 max-w-prose text-gray-600 dark:text-gray-200'>
              <p>{description}</p>

              <div className='mt-6'>
                <Button
                  showAnchorIcon
                  as={Link}
                  color='primary'
                  href={`https://www.google.com/maps?q=${lat},${lng}`}
                  size='sm'
                  target='_blank'
                >
                  Ver ubicación
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ButtonFallback () {
  return (
    <Button isLoading className='w-full sm:w-auto' color='secondary'>
      Cargando...
    </Button>
  )
}

interface DetailSectionProps {
  title: string
  children?: React.ReactNode
}

function DetailSection ({ children, title }: DetailSectionProps) {
  return (
    <div className='space-y-1.5'>
      <p className='text-sm font-medium'>{title}</p>
      {children}
    </div>
  )
}

interface GuestItemProps {
  gest: string
}

function GestItem ({ gest }: GuestItemProps) {
  return (
    <div className='flex items-center gap-4'>
      <span className='relative flex size-10 shrink-0 overflow-hidden rounded-full border'>
        <img
          alt='Placeholder for guest'
          className='aspect-square size-full'
          src='/assets/images/profile-placeholder.webp'
        />
      </span>
      <div>
        <p className='font-medium capitalize'>{gest}</p>
      </div>
    </div>
  )
}
