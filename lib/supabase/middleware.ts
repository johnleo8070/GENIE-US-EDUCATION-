import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Check for child session (children use cookie-based auth, not Supabase auth)
  const childSession = request.cookies.get('child_session')?.value
  const hasChildSession = !!childSession

  // Protect parent routes - require Supabase user authentication (parents only)
  if (pathname.startsWith('/parent') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // Protect kids dashboard - allow either parent (Supabase user) or child (cookie session)
  if (pathname.startsWith('/dashboard/kids') && !user && !hasChildSession) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // Redirect authenticated parent users away from auth pages
  if (user && (pathname.startsWith('/auth/login') || pathname === '/auth/sign-up')) {
    const url = request.nextUrl.clone()
    url.pathname = '/parent/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
