import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { getUserSession } from '@/utils/auth'
import EventFilters from '@/components/events/filters'
import { SectionLoader } from '@/components/fallbacks/loader'
import { ListOfUserEvents } from '@/components/events/list'
import { ServerPageProps } from '@/types'

export default async function MyEvents ({ searchParams }: ServerPageProps) {
  const session = await getUserSession()

  if (session === null) {
    redirect('/login?next=/my-events')
  }

  return (
    <section className='p-4 md:px-6'>
      <h2 className='text-2xl font-bold'>Mis eventos</h2>

      <Suspense fallback={null}>
        <EventFilters />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ListOfUserEvents
          className='mt-6'
          searchParams={{ ...searchParams, authorId: session.id }}
        />
      </Suspense>
    </section>
  )
}
