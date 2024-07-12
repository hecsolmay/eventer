import { Button } from '@nextui-org/button'

import { ChromeIcon } from '@/components/icons'

export default function LoginPage () {
  return (
    <main className='flex h-dvh flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-md text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
          ¡Bienvenido de nuevo!
        </h1>
        <p className='mt-4'>
          Ingresa a la pagina usando tu cuenta de Google.
        </p>
        <div className='mt-6'>
          <Button className='inline-flex w-full items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors'>
            <ChromeIcon className='size-5' />
            Iniciar sesión con Google
          </Button>
        </div>
      </div>
    </main>
  )
}
