import React, { Suspense } from "react";
import ToastHandler from "./add/_components/ToastHandler";
import ProductsTable from "./_components/ProductsTable";
import { createClient } from "@/lib/supabase/server";
import ProuductCategories from "@/components/product/ProuductCategories";

export default async function FurniturePage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const { category: selectedCategory = "all" } = await searchParams;
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (selectedCategory !== "all") {
    query = query.eq("category_slug", selectedCategory);
  }

  const { data: products, error } = await query;

  if (error) {
    console.error("An error occurred while retrieving data.", error.message);
  }

  const { data: categories } = await supabase.from("categories").select("*");

  return (
    <div className="space-y-6">
      <Suspense fallback={null}>
        <ToastHandler />
      </Suspense>
      <h1 className="text-3xl font-bold">Product Management</h1>
      <ProuductCategories categories={categories || []} />
      <ProductsTable
        products={products || []}
        currentCategory={selectedCategory}
      />
    </div>
  );
}
