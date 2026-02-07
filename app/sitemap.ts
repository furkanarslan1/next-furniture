import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIES_ARRAY } from "@/lib/constants/categories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://nextfurniture.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES_ARRAY.map(
    (category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  // Subcategory pages
  const subcategoryPages: MetadataRoute.Sitemap = CATEGORIES_ARRAY.flatMap(
    (category) =>
      (category.types || []).map((type) => ({
        url: `${baseUrl}/categories/${category.slug}/${type.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))
  );

  // Product pages (from database)
  let productPages: MetadataRoute.Sitemap = [];

  try {
    const supabase = await createClient();
    const { data: products } = await supabase
      .from("products")
      .select("slug, category_slug, type_slug, created_at")
      .eq("is_active", true);

    if (products) {
      productPages = products.map((product) => ({
        url: `${baseUrl}/categories/${product.category_slug}/${product.type_slug}/${product.slug}`,
        lastModified: product.created_at
          ? new Date(product.created_at)
          : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  return [...staticPages, ...categoryPages, ...subcategoryPages, ...productPages];
}