"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/auth-provider";

export function SidebarProfile() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="h-10 w-full animate-pulse bg-slate-200 rounded" />;

  const fullName = user?.user_metadata?.full_name || "Admin User";
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className="flex items-center gap-3 p-4 border-t">
      <Avatar>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{fullName[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-semibold truncate w-32">{fullName}</span>
        <span className="text-xs text-slate-500 capitalize">{user?.user_metadata?.role}</span>
      </div>
    </div>
  );
}