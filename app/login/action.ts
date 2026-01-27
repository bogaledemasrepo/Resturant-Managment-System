"use server"

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function signInWithGoogle(next?: string) {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // Supabase will redirect back to this URL after Google login
      redirectTo: `${origin}/auth/callback${next ? `?next=${next}` : ""}`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error(error);
    return redirect("/login?error=oauth_failed");
  }

  // Redirect the user to the Google Consent screen
  return redirect(data.url);
}

// "use server"

// import { createClient } from "@/lib/supabase/server";
// import { redirect } from "next/navigation";

// export async function signIn(formData: FormData) {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   const redirectTo = formData.get("redirectTo") as string; // Read the destination
  
//   const supabase = await createClient();

//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     return { error: "Invalid credentials" };
//   }

//   const role = data.user?.user_metadata?.role;

//   // Security Check: If they are trying to go to /admin but aren't an admin
//   if (redirectTo.startsWith('/admin') && role !== 'admin') {
//     redirect("/unauthorized");
//   }

//   // Success: Send them where they wanted to go
//   redirect(redirectTo);
// }