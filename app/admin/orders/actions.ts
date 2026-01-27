"use server"

import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(id: string, newStatus: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("orders")
    .update({ status: newStatus })
    .eq("id", id);

  if (error) {
    console.error("Status Update Error:", error);
    return { error: "Failed to update status" };
  }

  revalidatePath("/admin/orders");
  return { success: true };
}
