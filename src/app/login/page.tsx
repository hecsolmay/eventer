
import { redirect } from 'next/navigation'

import { ServerPageProps } from '@/types'
import { GoogleOAuthButton } from '@/components/auth/oauth-button'
import { getUserSession } from '@/utils/auth'

export default async function LoginPage ({ searchParams }: ServerPageProps) {
  const { next = '/'} = searchParams

  const session = await getUserSession()

  if (session !== null) {
    redirect(next)
  }

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
          <GoogleOAuthButton redirectTo={next} />
        </div>
      </div>
    </main>
  )
}
