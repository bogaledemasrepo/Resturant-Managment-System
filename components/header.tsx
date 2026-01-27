"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProfile } from "./sidebar-profile";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            System / Dashboard
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </Button>
          <div className="h-8 w-px bg-slate-200 mx-2" />
          <div className="flex items-center gap-3">
            <SidebarProfile />
          </div>
        </div>
      </div>
    </header>
  );
}