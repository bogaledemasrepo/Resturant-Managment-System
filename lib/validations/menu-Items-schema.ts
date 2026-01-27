import * as z from "zod";

export const menuItemSchema = z.object({
  name: z.string().min(2, "Required"),
  category_id: z.string().min(2, "Required"),
  price: z.number().min(0, "Price must be at least 0"),
  image_url: z.string().optional().or(z.literal("")).nullable(),
  description: z.string().min(2, "Required"),
});

export type MenuItemFormValues = z.infer<typeof menuItemSchema>;
