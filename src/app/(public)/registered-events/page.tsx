import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { getUserSession } from '@/utils/auth'
import EventFilters from '@/components/events/filters'
import { SectionLoader } from '@/components/fallbacks/loader'
import { ListOfUserRegisteredEvents } from '@/components/events/list'
import { ServerPageProps } from '@/types'

export default async function RegisteredEventsPage ({
  searchParams
}: ServerPageProps) {
  const session = await getUserSession()

  if (!session) {
    redirect('/login?next=/registered-events')
  }

  return (
    <section className='p-4 md:px-6'>
      <h2 className='text-2xl font-bold'>Mis eventos</h2>

      <Suspense fallback={null}>
        <EventFilters />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ListOfUserRegisteredEvents
          className='mt-6'
          searchParams={{ ...searchParams, userId: session.id }}
          userId={session.id}
        />
      </Suspense>
    </section>
  )
}
