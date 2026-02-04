"use server";

import { createClient } from "@/lib/supabase/server";
import { PaginatedResult } from "@/types/PaginatedResult";

export async function getBySubCategoryProductAction(
  typeSlug: string,
  page: number = 1,
  limit: number = 12,
): Promise<PaginatedResult> {
  const supabase = await createClient();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("products")
    .select("id, title, slug, price, discount_rate, images", { count: "exact" })
    .eq("is_active", true)
    .eq("type_slug", typeSlug)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching latest products:", error);
    return { products: [], totalCount: 0, totalPages: 0 };
  }

  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  return { products: data ?? [], totalCount, totalPages };
}
