"use server";

import { createClient } from "@/lib/supabase/server";
import { ProductCardType } from "@/types/ProductType";

export async function getBySubCategoryLatestProducts(
  typeSlug: string,
): Promise<ProductCardType[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, title, slug, price, discount_rate, images")
    .eq("is_active", true)
    .eq("type_slug", typeSlug)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching latest products:", error);
    return [];
  }

  return data ?? [];
}
