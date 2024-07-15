'use server'

import prisma from './prisma'
import { createClient } from './supabase/server'

export async function getUserSession () {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user === null) {
    return null
  }

  const userData = await prisma.users.findUnique({
    where: {
      id: user.id
    }
  })

  return userData
}
