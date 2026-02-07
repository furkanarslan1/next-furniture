"use server";

import { createClient } from "@/lib/supabase/server";

export async function getCategoryStatsAction() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("category_slug")
    .eq("is_active", true);

  if (error || !data) return [];

  const counts: Record<string, number> = {};
  data.forEach((product) => {
    const cat = product.category_slug;
    counts[cat] = (counts[cat] || 0) + 1;
  });

  const colors: Record<string, string> = {
    "living-room": "#f97316",
    bedroom: "#3b82f6",
    "dining-room": "#22c55e",
    "home-office": "#8b5cf6",
    "kids-room": "#ec4899",
    outdoor: "#14b8a6",
    "storage-organization": "#f59e0b",
  };

  return Object.entries(counts).map(([category, count]) => ({
    category,
    count,
    fill: colors[category] || "#6b7280",
  }));
}
