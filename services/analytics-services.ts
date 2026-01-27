import { createClient } from "@/lib/supabase/server";

export async function getMonthlySales() {
  const supabase = await createClient();
  
  // Fetching total_amount and created_at from orders
  const { data, error } = await supabase
    .from("orders")
    .select("total_amount, created_at")
    .eq("status", "completed");

  if (error) return [];

  // Transform data for Recharts (Group by Month)
  const monthlyData = data.reduce((acc: { [key: string]: number }, order: { total_amount: number, created_at: string }) => {
    const month = new Date(order.created_at).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + (order.total_amount / 100);
    return acc;
  }, {});

  return Object.keys(monthlyData).map(month => ({
    name: month,
    total: monthlyData[month]
  }));
}