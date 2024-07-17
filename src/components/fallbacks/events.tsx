import { CreateEventButton } from '@/components/events/buttons-client'

export function EmptyListOfEvents () {
  return (
    <div className='flex flex-col items-center justify-center gap-y-4 py-16'>
      <h1 className='text-center text-2xl font-bold'>No se encontró ningún evento</h1>
      <p className='text-center text-sm'>
        Prueba a cambiar los filtros o busca un evento específico
      </p>
    </div>
  )
}

export function EmptyListOfUserEvents () {
  return (
    <div className='flex flex-col items-center justify-center gap-y-4 py-16'>
      <h1 className='text-center text-2xl font-bold'>
        No se encontró ningún evento tuyo
      </h1>
      <p className='text-center text-sm'>
        Prueba a cambiar los filtros o
      </p>

      <CreateEventButton />
    </div>
  )
}

export function EmptyListOfAssistantsEvent () {
  return (
    <div className='flex flex-col items-center justify-center gap-y-4 py-16'>
      <h1 className='text-center text-2xl font-bold'>
        Este evento no tiene asistentes registrados
      </h1>
    </div>
  )
}