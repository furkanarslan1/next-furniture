import { z } from "zod";

/**
 * HERO SLIDE – FORM
 * Image is uploaded from the user's computer
 */
export const heroSlideFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(120, "Title must be at most 120 characters."),

  subtitle: z
    .string()
    .max(200, "Subtitle must be at most 200 characters.")
    .optional(),

  target_url: z
    .string()
    .url("Please enter a valid URL.")
    .optional()
    .or(z.literal("")),

  is_active: z.boolean().default(true),
});

/**
 * HERO SLIDE – DATABASE RECORD
 * Stored in Supabase after image upload
 */
export const heroSlideSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  subtitle: z.string().nullable(),
  image_url: z.string().url(),
  target_url: z.string().url().nullable(),
  order_index: z.number().int(),
  is_active: z.boolean(),
  created_at: z.string().datetime(),
});

export const heroSlideCreateSchema = z.object({
  title: z.string().min(3).max(120),
  subtitle: z.string().nullable(),
  image_url: z.string().url(),
  target_url: z.string().nullable(),
  is_active: z.boolean(),
});

/**
 * TYPES
 */
export type AddHeroActionInput = z.infer<typeof heroSlideCreateSchema>;

export type HeroSlideFormValues = z.infer<typeof heroSlideFormSchema>;
export type HeroSlideFormInput = z.input<typeof heroSlideFormSchema>;
export type HeroSlide = z.infer<typeof heroSlideSchema>;
