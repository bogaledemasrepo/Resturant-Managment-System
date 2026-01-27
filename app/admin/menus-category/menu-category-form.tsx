"use client";

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
import { Textarea } from "@/components/ui/textarea";

import { Loader2 } from "lucide-react";
import {
  MenuCategoryFormValues,
  menuCategorySchema,
} from "@/lib/validations/menu-category-schema";
import { addMenuCategory, updateMenuCategory } from "./actions";

interface CategoryFormProps {
  initialData?: {
    id: string;
    name: string;
    description: string;
  };
  onSuccess?: () => void;
}

export function CategoryForm({ initialData, onSuccess }: CategoryFormProps) {

  // Note: Ensure your Zod schema allows 'image_file' as a File object temporarily
  const form = useForm<{
    name: string;
    description: string;
  }>({
    resolver: zodResolver(menuCategorySchema),
    defaultValues: initialData || {
      name: "",
      description: "",
    },
  });

  async function onSubmit(data: MenuCategoryFormValues) {
    try {
      if (initialData) {
        // Update existing category
        await updateMenuCategory(initialData.id, data);
        toast.success("Category updated successfully!");
      } else {
        // Create new categories
       await addMenuCategory(data);
        toast.success("Category created successfully!");
      }
      onSuccess?.();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-xl border shadow-sm max-w-2xl mx-auto"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Strawberry Cheesecake" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload Area */}

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
                      placeholder="Describe your menu category..."
                      {...field}
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
              "Update Category"
            ) : (
              "Create Category"
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
