import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'

export default function Hero () {
  return (
    <section className='w-full py-4'>
      <div className='container px-4 md:px-6'>
        <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                Explora los eventos de la comunidad
              </h1>
              <p className='max-w-[600px] md:text-xl'>
                Nuestra plataforma de eventos permite a las comunidades crear
                eventos de interés para sus miembros y promocionarlos en línea.
              </p>
            </div>
            <div className='flex w-full max-w-sm gap-2'>
              <Button
                as={Link}
                color='default'
                href='/my-events?action=create'
                variant='bordered'
              >
                Crear tu evento
              </Button>
              <Button as={Link} color='secondary' href='/events'>
                Explora los eventos
              </Button>
            </div>
          </div>
          <img
            alt='Hero'
            className='mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last'
            height='310'
            src='/assets/images/hero-image.webp'
            width='550'
          />
        </div>
      </div>
    </section>
  )
}
