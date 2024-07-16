import { NextResponse, type NextRequest } from 'next/server'

import { updateSession } from '@/utils/supabase/middleware'

const PUBLIC_PAGES = ['/auth', '/login', '/api']

export async function middleware (request: NextRequest) {
  const { nextUrl } = request

  const { response, user } = await updateSession(request)

  // CHECK IF THE URL IS LOGIN
  if (PUBLIC_PAGES.some(page => nextUrl.pathname.startsWith(page))) {
    return response
  }

  if (user === null) {
    const pathname = nextUrl.pathname ?? '/'

    return NextResponse.redirect(
      new URL(`/login?next=${encodeURIComponent(pathname)}`, request.url)
    )
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/',
    '/events/:path*',
    '/my-events/:path*'
  ]
}
