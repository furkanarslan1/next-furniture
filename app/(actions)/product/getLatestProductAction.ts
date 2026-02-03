"use server";

import { createClient } from "@/lib/supabase/server";

export async function getLatestProductsAction() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, title, slug, price, discount_rate, images")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching latest products:", error);
    return [];
  }

  return data ?? [];
}
