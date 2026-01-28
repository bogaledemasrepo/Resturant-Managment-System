"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/auth-provider";
import { LogOut,LucideLogOut } from "lucide-react"; // Import icon
import { Button } from "@/components/ui/button";

export function SidebarProfile() {
  const { user, isLoading, signOut } = useAuth(); // Destructure signOut

  if (isLoading) return <div className="h-10 w-full animate-pulse bg-slate-200 rounded" />;

  const fullName = user?.user_metadata?.full_name || "Admin User";
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className="flex items-center justify-between p-4 border-t w-full gap-2">
      <div className="flex items-center gap-3 overflow-hidden">
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{fullName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold truncate">{fullName}</span>
          <span className="text-xs text-slate-500 capitalize">{user?.user_metadata?.role}</span>
        </div>
      </div>
      
      {/* Logout Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={signOut}
        className="text-slate-500 hover:text-red-600 hover:bg-red-50"
        title="Logout"
      >
        <LucideLogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}