"use client";

import React, { useState } from "react";
import { AdminSidebar } from "./side-bar";
import { cn } from "@/lib/utils";
import { AdminHeader } from "./header";
import { useOrderNotifications } from "@/hooks/use-order-notifications";

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(true);

  // Activate the realtime listener
  useOrderNotifications();
  return (
    <div className="flex min-h-screen">
      <AdminSidebar isOpen={isOpen} setOpen={setOpen} />
      
      {/* Dynamic margin based on sidebar state */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        isOpen ? "ml-64" : "ml-20"
      )}>
        <AdminHeader />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}