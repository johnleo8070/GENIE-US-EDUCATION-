import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/parent/dashboard"
  const type = searchParams.get("type")

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.user) {
      // If this is an email confirmation, redirect to login with success message
      if (type === "signup" || type === "email") {
        return NextResponse.redirect(`${origin}/auth/login?confirmed=true`)
      }
      
      // For password reset, redirect to reset password page
      if (type === "recovery") {
        return NextResponse.redirect(`${origin}/auth/reset-password`)
      }
      
      // Otherwise redirect to dashboard
      const role = data.user.user_metadata?.role || 'parent'
      if (role === 'parent') {
        return NextResponse.redirect(`${origin}/parent/dashboard`)
      } else {
        return NextResponse.redirect(`${origin}/dashboard/kids`)
      }
    }
  }

  // Return to login with error
  return NextResponse.redirect(`${origin}/auth/login?error=Could not authenticate`)
}
