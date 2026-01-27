"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { columns } from "./columns";
import { Order } from "@/types";
import { toast } from "sonner";
import { DataTable } from "@/components/shared/data-table";

export function RealTimeOrders({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const supabase = createClient();

  useEffect(() => {
    // 1. Listen for ALL changes to the orders table
    const channel = supabase
      .channel('admin-orders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newOrder = payload.new as Order;
            setOrders((prev) => [newOrder, ...prev]);
            toast.success("New Order Received! 🍰", {
               description: `Order #${newOrder.id.slice(0, 8)} for ${newOrder.customer_email}`
            });
          }

          if (payload.eventType === 'UPDATE') {
            const updatedOrder = payload.new as Order;
            setOrders((prev) => 
              prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
            );
          }

          if (payload.eventType === 'DELETE') {
            setOrders((prev) => prev.filter((o) => o.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return <DataTable columns={columns} data={orders} searchKey="customer_email" />;
}