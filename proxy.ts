import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = user?.user_metadata?.role;
  const { pathname } = request.nextUrl;
  console.log("Proxy Middleware - Pathname:", pathname);
  // --- CIRCUIT BREAKER ---
  // If we are already on login or auth pages, don't redirect
  if (pathname.startsWith("/login")) {
    return response;
  }

    if (!user) {
      const loginUrl = new URL("/login", request.url);
      console.log("Redirecting to login from admin route", loginUrl.toString());
      // Pass the current path so we can redirect back after login
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  // Protect Admin Routes
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      const loginUrl = new URL("/customer", request.url);
      console.log("Redirecting to customer from admin route", loginUrl.toString());
      // Pass the current path so we can redirect back after login
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static assets
     */
    "/((?!_next/static|_next/image|favicon.ico|sounds|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
