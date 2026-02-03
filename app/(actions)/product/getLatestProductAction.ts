"use server";

import { createClient } from "@/lib/supabase/server";

export async function getLatestProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data;
}
