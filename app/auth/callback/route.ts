import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Use 'next' search param or default to admin
  const next = searchParams.get('next') ?? '/admin'

  if (code) {
    const supabase = await createClient()
    
    // Exchange the code for a session
    const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && user) {
      const role = user.user_metadata?.role

      // Protection: Only allow admins to enter the admin area
      if (next.startsWith('/admin') && role !== 'admin') {
        return NextResponse.redirect(`${origin}/customer`)
      }

      // Successful login
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If there's no code or an error, send back to login
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}