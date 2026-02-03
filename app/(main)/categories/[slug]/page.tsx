import { getByCategoryProductAction } from "@/app/(actions)/categories/getByCategoryProductAction";
import ProductCard from "@/components/product/ProductCard";
import { notFound } from "next/navigation";
import React from "react";

interface CategoryDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryDetailPage({
  params,
}: CategoryDetailProps) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }

  const products = await getByCategoryProductAction(slug);
  return (
    <div>
      <div className="max-w-7xl mx-auto space-y-4">
        <h1>{slug.split("-").join(" ").toUpperCase()}</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
