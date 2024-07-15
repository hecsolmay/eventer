export function EmptyListOfEvents () {
  return (
    <div className='flex flex-col items-center justify-center py-16'>
      <h1 className='text-center text-2xl font-bold'>No se encontró ningún evento</h1>
      <p className='text-center text-sm'>
        Prueba a cambiar los filtros o busca un evento específico
      </p>
    </div>
  )
}
