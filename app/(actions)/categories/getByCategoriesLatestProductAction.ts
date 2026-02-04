"use server";

import { createClient } from "@/lib/supabase/server";
import { ProductCardType } from "@/types/ProductType";

export async function getLatestProductsByCategory(
  slug: string,
): Promise<ProductCardType[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, title, slug, price, discount_rate, images")
    .eq("category_slug", slug)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching latest products:", error);
    return [];
  }

  return data ?? [];
}
