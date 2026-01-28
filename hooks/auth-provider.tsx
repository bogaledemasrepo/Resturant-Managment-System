"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

// auth-provider.tsx
type AuthContextType = {
  user: User | null;
  role: string | null;
  isLoading: boolean;
  signOut: () => Promise<void>; // Add this
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isLoading: true,
  signOut:()=>new Promise(()=>{})
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const initialize = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setRole(session?.user.user_metadata?.role ?? null);
      setIsLoading(false);
    };

    initialize();

    // Listen for auth changes (login/logout/metadata updates)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setRole(session?.user.user_metadata?.role ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  // ... inside AuthProvider function
const signOut = async () => {
  await supabase.auth.signOut();
  window.location.href = "/login"; // Force a clean redirect
};

  return (
    <AuthContext.Provider value={{ user, role, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);