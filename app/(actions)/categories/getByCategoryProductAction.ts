"use server";

import { createClient } from "@/lib/supabase/server";

export async function getByCategoryProductAction(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, title, slug, price, discount_rate, images")
    .eq("category_slug", slug)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching latest products:", error);
    return [];
  }

  return data ?? [];
}
