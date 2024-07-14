import { Spinner } from '@nextui-org/react'

export function SectionLoader () {
  return (
    <section className="grid w-full place-content-center py-32">
      <Spinner />
    </section>
  )
}