import { createClient } from "@/lib/supabase/server";

export async function isAdmin() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) return false;

  // Metadata is stored in user_metadata in the session object
  return user.user_metadata?.role === "admin";
}