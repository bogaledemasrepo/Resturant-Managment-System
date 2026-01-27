"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { ImageUpload } from "@/components/image-upload";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import {
  MenuItemFormValues,
  menuItemSchema,
} from "@/lib/validations/menu-Items-schema";
import { createMenuItem, updateMenuItem } from "./actions";
interface MenuItem {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
}
interface MenuFormProps {
  initialData?: MenuItem;
  categories:{id:string,name:string,description:string}[]
  onSuccess?: () => void;
}

export function MenuForm({ initialData, onSuccess,categories }: MenuFormProps) {
  const supabase = createClient();

  // Note: Ensure your Zod schema allows 'image_file' as a File object temporarily
  const form = useForm<{
    name: string;
    description: string;
    price: number;
    image_url?: string | null | undefined;
    category_id: string;
  }>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: initialData || {
      name: "",
      price: 0,
      category_id: "",
      image_url: null,
      description: "",
    },
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  async function onSubmit(data: MenuItemFormValues) {
    try {
      let finalImageUrl = data.image_url;

      // 1. Upload to Supabase only if a new file was selected
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `menus/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("Menu-images")
          .upload(filePath, imageFile);
          console.log("Error image upload:", uploadError);

        if (uploadError) throw new Error("Image upload failed");

        const { data: urlData } = supabase.storage
          .from("Menu-images")
          .getPublicUrl(filePath);

        finalImageUrl = urlData.publicUrl;
      }

      const payload = { ...data, image_url: finalImageUrl };

      // 2. Database Action
      if (initialData) {
        console.log(
          "Updating Menu Item with ID:",
          initialData.id,
          "Payload:",
          payload,
        );
        await updateMenuItem(initialData.id, payload);
        toast.success("Menu updated successfully!");
      } else {
        console.log("Creating Menu Item with Payload:", payload);
        const response = await createMenuItem(payload);
        console.log("Create Menu Item Response:", response);
        toast.success("Menu created successfully!");
      }

      onSuccess?.();
    } catch (error) {
      if (error instanceof Error)
        toast.error(error?.message ?? "Something went wrong");
      else toast.error("Something went wrong");
    }
  }
console.log(categories,"CATEGORIES",initialData)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-xl border shadow-sm max-w-2xl mx-auto"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.log("Validation Errors:", errors),
          )}
          className="space-y-6"
        >
          <div className="flex gap-4 h-40">
            {/* Image Upload Area */}
            <div className="space-y-2">
              <FormLabel>Menu Image</FormLabel>
              <ImageUpload
                value={imageFile || form.getValues("image_url")||""}
                onChange={(file) => setImageFile(file)}
                onRemove={() => {
                  setImageFile(null);
                  form.setValue("image_url", "");
                }}
              />
            </div>
            <div className="space-y-2 w-full">
              <FormLabel>Description</FormLabel>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="h-32 w-full">
                    <FormControl>
                      <Textarea
                        className="flex-1"
                        placeholder="Describe your delicious dessert..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Menu Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Strawberry Cheesecake" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(val:string)=>field.onChange(categories.find(Item=>Item.name==val)?.id)}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(Item=>
                      <SelectItem key={Item.id} value={Item.id}>{Item.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val === "" ? 0 : Number(val));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" />
                Processing...
              </span>
            ) : initialData ? (
              "Update Menu"
            ) : (
              "Create Menu"
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
