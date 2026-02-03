import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// --- 1. Product Attribute Schema ---
export const ProductAttributeSchema = z.object({
  key: z.string().min(1, "Attribute name is required"),
  value: z.string().min(1, "value is required"),
});

// --- 2. Product Image Schema ---
export const ProductImageSchema = z.object({
  url: z.union([
    // Existing images coming from the database
    z.string().min(1),

    // Newly uploaded files from the client
    z
      .instanceof(File)
      .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        "File size must be less than or equal to 5MB.",
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, .png, and .webp formats are supported.",
      ),
  ]),
  alt: z.string().optional().default("Product image"),
});

// --- 3. Main Product Schema ---
export const ProductSchema = z.object({
  title: z.string().min(3, "Product title must be at least 3 characters long"),

  // title → will be generated via slugify, but still validated here
  slug: z.string().optional().or(z.literal("")),

  description: z.string().min(10, "Description is too short"),

  // Form values may come as strings, so we use coerce
  price: z.coerce.number().positive("Price must be greater than 0"),

  discount_rate: z.coerce
    .number()
    .min(0, "Discount cannot be less than 0")
    .max(100, "Discount cannot be greater than 100%")
    .optional()
    .default(0),

  categorySlug: z.string().min(1, "Please select a category"),
  type_slug: z.string().min(1, "Please select a subcategory"),

  is_active: z.boolean().default(true),

  // Dynamic attributes (e.g. Material, Size, etc.)
  attributes: z.array(ProductAttributeSchema).default([]),

  // At least one product image is required
  images: z
    .array(ProductImageSchema)
    .min(1, "You must add at least one product image"),

  created_at: z.string().optional(),
});

// --- TypeScript Types ---
// You can use these types directly in components and functions
export type ProductAttribute = z.infer<typeof ProductAttributeSchema>;
export type ProductImage = z.infer<typeof ProductImageSchema>;
export type ProductInput = z.infer<typeof ProductSchema>;

// Note: Pure data coming from the database (after upload, all images are URLs)
export type ProductDatabase = Omit<ProductInput, "images"> & {
  images: { url: string; alt?: string }[];
};
