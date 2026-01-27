import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import { RealTimeOrders } from "./real-time-orders";

export default async function AdminOrdersPage() {
  const supabase = createAdminClient();

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("Orders data:", orders);
  if (error) {
    return <div className="p-8 text-red-500">Error loading orders.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track your customer purchases.
          </p>
        </div>
      </div>
      <RealTimeOrders initialOrders={orders || []} />
    </div>
  );
}
