"use server";

import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types/ProductType";

export async function getProductDetail(
  productSlug: string,
): Promise<Product | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", productSlug)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching product detail:", error);
    return null;
  }

  return data;
}
