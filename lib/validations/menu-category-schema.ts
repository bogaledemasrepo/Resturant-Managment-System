import * as z from "zod";

export const menuCategorySchema = z.object({
  name: z.string().min(2, "Required"),
  description: z.string().min(2, "Required"),
});

export type MenuCategoryFormValues = z.infer<typeof menuCategorySchema>;
