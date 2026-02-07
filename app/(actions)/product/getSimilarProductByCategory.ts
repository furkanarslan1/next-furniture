"use server";

import { createClient } from "@/lib/supabase/server";
import { ProductCardType } from "@/types/ProductType";

export async function getSimilarProductByCategory(
  category: string,
): Promise<ProductCardType[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, title, slug, price, discount_rate, images, category_slug, type_slug",
    )
    .eq("category_slug", category)
    .eq("is_active", true)
    .limit(10);
  if (error) {
    console.error("Error fetching similar products:", error);
    return [];
  }

  return data ?? [];
}
