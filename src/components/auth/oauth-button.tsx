'use client'

import { Button } from '@nextui-org/button'

import { ChromeIcon } from '../icons'

import { loginWithGoogle } from '@/actions/auth'

interface Props {
  redirectTo?: string
}

export function GoogleOAuthButton ({ redirectTo }: Props) {

  const handleLogin = async () => {
    await loginWithGoogle(redirectTo)
  }

  return (
    <Button
      className='inline-flex w-full items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors'
      onClick={handleLogin}
    >
      <ChromeIcon className='size-5' />
      Iniciar sesión con Google
    </Button>
  )
}
