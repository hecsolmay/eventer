import { ListOfRecentEvents } from '@/components/home/events'
import Hero from '@/components/home/hero'

export const dynamic = 'force-dynamic'

export default function Home () {
  return (
    <>
      <Hero />
      <ListOfRecentEvents />
    </>
  )
}
