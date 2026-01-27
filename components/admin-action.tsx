"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ClientCheck() {
  const [role, setRole] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function getRole() {
      const { data: { session } } = await supabase.auth.getSession();
      setRole(session?.user.user_metadata?.role);
    }
    getRole();
  }, [supabase]);

  if (role !== "admin") return null;

  return <button>Admin Only Action</button>;
}