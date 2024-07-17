import { useEffect, useState } from 'react'

import { getEventAssistants } from '@/actions/assistants'
import { EventAssistantCard } from '@/components/events/card'
import { EmptyListOfAssistantsEvent } from '@/components/fallbacks/events'
import { SectionLoader } from '@/components/fallbacks/loader'
import { AssistantType } from '@/types'

interface ListOfAssistantsEventProps
  extends React.HTMLAttributes<HTMLDivElement> {
  eventId: string
}

export function ListOfAssistantsEvent ({
  eventId,
  ...props
}: ListOfAssistantsEventProps) {
  const [assistants, setAssistants] = useState<AssistantType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getAssistants = async () => {
      setIsLoading(true)
      try {
        const result = await getEventAssistants(eventId)

        setAssistants(result)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    getAssistants().catch(error => {
      // eslint-disable-next-line no-console
      console.error(error)
    })
  }, [])

  if (isLoading) {
    return <SectionLoader />
  }

  if (assistants.length === 0 && !isLoading) {
    return <EmptyListOfAssistantsEvent />
  }

  return (
    <div {...props} className='space-y-4'>
      {assistants.map(assistants => (
        <EventAssistantCard key={assistants.id} user={assistants} />
      ))}
    </div>
  )
}
