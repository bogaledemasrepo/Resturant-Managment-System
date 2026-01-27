"use server"

import { createClient } from "@/lib/supabase/server";
import { MenuCategoryFormValues, menuCategorySchema } from "@/lib/validations/menu-category-schema";
import { revalidatePath } from "next/cache";

export async function addMenuCategory(values: MenuCategoryFormValues) {
  // 1. Server-side validation (Security Layer)
  const validatedFields = menuCategorySchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { 
      error: "Invalid fields provided.", 
      details: validatedFields.error.flatten().fieldErrors 
    };
  }

  const supabase = await createClient();
  
  // 2. Database Insertion
  const { data, error } = await supabase
    .from("categories")
    .insert({
      name: validatedFields.data.name,
      description: validatedFields.data.description,
    })
    .select()
    .single();

  if (error) {
    console.error("Database Error:", error);
    return { error: "Failed to add menu category to database." };
  }

  // 3. Purge the Next.js cache for the menu categories page
  revalidatePath("/admin/menus-category");
  
  return { success: true, data };
}

export async function getMenuCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Database Error:", error);
    return { error: "Failed to fetch menu categories from database." };
  }
  const ddd =data as {id:string,name:string,description:string}[]

  return {data:ddd}
} 

export async function deleteMenuCategory(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Database Error:", error);
    return { error: "Failed to delete menu category from database." };
  }

  // 3. Purge the Next.js cache for the menu categories page
  revalidatePath("/admin/menus-category");

  return { success: true };
}


export async function updateMenuCategory(id: string, values: MenuCategoryFormValues) {
  // 1. Server-side validation (Security Layer)
  const validatedFields = menuCategorySchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { 
      error: "Invalid fields provided.", 
      details: validatedFields.error.flatten().fieldErrors 
    };
  }

  const supabase = await createClient();
  
  // 2. Database Update
  const { data, error } = await supabase
    .from("categories")
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
    return { error: "Failed to update menu category in database." };
  }

  // 3. Purge the Next.js cache for the menu categories page
  // This ensures the admin sees the updated data immediately.
  revalidatePath("/admin/menus-category");
  
  return { success: true, data };
} 