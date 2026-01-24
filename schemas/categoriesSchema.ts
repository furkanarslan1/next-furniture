import { z } from "zod";

// SubCategory
export const SubCategorySchema = z.object({
  id: z.string().uuid().optional(),
  category_id: z.string().uuid().optional(),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  label: z.string().min(2, "Title must be at least 2 characters"),
  isActive: z.boolean().default(true),
});

// Category
export const CategorySchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  label: z.string().min(2, "Category name is require"),

  types: z.array(SubCategorySchema).optional(),
});

// TypeScript
export type SubCategoryInput = z.infer<typeof SubCategorySchema>;
export type CategoryInput = z.infer<typeof CategorySchema>;
