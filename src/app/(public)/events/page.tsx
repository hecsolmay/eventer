import { Suspense } from 'react'

import { SectionLoader } from '@/components/fallbacks/loader'
import { ListOfEvents } from '@/components/events/list'
import EventFilters from '@/components/events/filters'
import { ServerPageProps } from '@/types'

export default function EventsPage ({ searchParams }: ServerPageProps) {
  return (
    <section className='p-4 md:px-6'>
      <h2 className='text-2xl font-bold'>
        Encuentra los eventos que te interesan
      </h2>

      <EventFilters />

      <Suspense fallback={<SectionLoader />}>
        <ListOfEvents className='mt-6' searchParams={searchParams} />
      </Suspense>
    </section>
  )
}
