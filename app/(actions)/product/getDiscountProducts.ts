"use server";

import { createClient } from "@/lib/supabase/server";

export async function getDiscountProductsAction() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, title, slug, price, discount_rate, images")
    .gt("discount_rate", 0)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching discount products:", error);
    return [];
  }

  return data ?? [];
}
