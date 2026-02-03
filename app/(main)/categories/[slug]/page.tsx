import { getByCategoryProductAction } from "@/app/(actions)/categories/getByCategoryProductAction";
import ProductCard from "@/components/product/ProductCard";
import { CATEGORIES, CATEGORIES_ARRAY } from "@/lib/constants/categories";
import Link from "next/link";
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
  const category = CATEGORIES[slug];

  return (
    <div>
      <div className="max-w-7xl mx-auto space-y-4">
        <h1>{slug.split("-").join(" ").toUpperCase()}</h1>
        {category?.types && category.types.length > 0 && (
          <div>
            <h2 className="font-semibold text-gray-600 text-xl">
              Sub Categories
            </h2>

            <div className="flex flex-wrap gap-3 bg-gray-200 p-2 rounded-sm w-fit">
              {category.types.map((type) => (
                <Link
                  key={type.slug}
                  href={`/categories/${slug}/${type.slug}`}
                  className="px-4 py-2 rounded-md bg-muted hover:bg-muted/80 text-sm"
                >
                  {type.label}{" "}
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
