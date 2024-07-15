'use server'

import { redirect } from 'next/navigation'

import { APP_URL } from '@/config'
import { createClient } from '@/utils/supabase/server'

const REDIRECT_URI = `${APP_URL}/auth/callback`

const getRedirectPath = (redirectTo?: string) =>
  `${REDIRECT_URI}?next=${redirectTo ?? '/'}`

export async function loginWithGoogle (redirectTo?: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      },
      redirectTo: getRedirectPath(redirectTo)
    }
  })

  if (data.url !== null) {
    redirect(data.url)
  }

  if (error !== null) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

export async function logout () {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error !== null) {
    // eslint-disable-next-line no-console
    console.error(error)
  }

  redirect('/login')
}