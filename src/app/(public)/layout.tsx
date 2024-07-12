import { Navbar } from '@/components/navbar'

export default function PublicLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className='container mx-auto max-w-7xl grow px-6 pt-16'>
        {children}
      </main>
    </>
  )
}
