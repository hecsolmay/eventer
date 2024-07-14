import { Suspense } from 'react'

import { ListOfEvents } from '@/components/events/list'
import { SectionLoader } from '@/components/fallbacks/loader'

export function ListOfRecentEvents () {
  return (
    <section className="px-4 py-8 md:px-6">
      <h2 className="text-2xl font-bold">Los últimos eventos creados</h2>

      <Suspense fallback={<SectionLoader />}>
        <ListOfEvents hidePagination className='mt-6' />
      </Suspense>
    </section>
  )
}