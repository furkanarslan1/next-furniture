"use server";

import { createClient } from "@/lib/supabase/server";
import { PaginatedResult } from "@/types/PaginatedResult";
import { ProductCardType } from "@/types/ProductType";

export async function getByCategoryProductAction(
  slug: string,
  page: number = 1,
  limit: number = 12,
): Promise<PaginatedResult> {
  const supabase = await createClient();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("products")
    .select("id, title, slug, price, discount_rate, images, category_slug, type_slug", { count: "exact" })
    .eq("category_slug", slug)
    .eq("is_active", true)
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
