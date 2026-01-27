"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useOrderNotifications() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // 1. Create the channel for 'orders' table
    const channel = supabase
      .channel("admin-order-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT", // Only notify on NEW orders
          schema: "public",
          table: "orders",
        },
        (payload) => {
          // 2. Play a notification sound (optional but professional)
          const audio = new Audio("/sounds/notification.mp3");
          audio.play().catch(() => {}); // Catch browser block policies

          // 3. Trigger a "Rich" Toast
          toast.success("New Order Received! 🍰", {
            description: `Order #${payload.new.id.slice(0, 8)} for $${(payload.new.total_amount / 100).toFixed(2)}`,
            action: {
              label: "View Order",
              onClick: () => router.push(`/admin/orders/${payload.new.id}`),
            },
            duration: 10000, // Stay for 10 seconds
          });

          // 4. Refresh the current page data (if on the orders list)
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);
}