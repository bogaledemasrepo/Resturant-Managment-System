"use server"

import { createClient } from "@/lib/supabase/server";
import { MenuItemFormValues, menuItemSchema } from "@/lib/validations/menu-Items-schema";
import { revalidatePath } from "next/cache";

export async function createMenuItem(values: MenuItemFormValues) {
  // 1. Server-side validation (Security Layer)
  const validatedFields = menuItemSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { 
      error: "Invalid fields provided.", 
      details: validatedFields.error.flatten().fieldErrors 
    };
  }

  const supabase = await createClient();
  
  // 2. Database Insertion
  const { error } = await supabase
    .from("menu_items")
    .insert([{
      name: validatedFields.data.name,
      description: validatedFields.data.description,
    }])
    .select()
    .single();

  if (error) {
    console.error("Database Error:", error);
    return { error: "Failed to create dessert in database." };
  }

  // 2. Refresh the inventory page automatically
  revalidatePath("/admin/products");
  return { success: true };
}

export async function getMenuItems() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Database Error:", error);
    return { error: "Failed to fetch menu items from database." };
  }

  return { data };
} 
export async function updateMenuItem(id: string, values: MenuItemFormValues) {
  // 1. Server-side validation (Security Layer)
  const validatedFields = menuItemSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { 
      error: "Invalid fields provided.", 
      details: validatedFields.error.flatten().fieldErrors 
    };
  }

  const supabase = await createClient();
  
  // 2. Database Update
  const { data, error } = await supabase
    .from("menu_items")
    .update({
      name: validatedFields.data.name,
      description: validatedFields.data.description,
      // We don't update 'created_at' or 'id'
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Database Error:", error);
    return { error: "Failed to update dessert in database." };
  }

  // 3. Purge the Next.js cache for the inventory page
  // This ensures the admin sees the updated data immediately.
  revalidatePath("/admin/inventory");
  
  return { success: true, data };
}

export async function deleteMenuItem(id: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("menu_items")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/inventory");
  return { success: true };
}