import { getLatestProductsByCategory } from "@/app/(actions)/categories/getByCategoriesLatestProductAction";
import { getByCategoryProductAction } from "@/app/(actions)/categories/getByCategoryProductAction";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/product/ProductCard";
import ProductSlider from "@/components/product/ProductSlider";
import { CATEGORIES } from "@/lib/constants/categories";
import { formatSlug } from "@/utils/string";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface CategoryDetailProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}
export default async function CategoryDetailPage({
  params,
  searchParams,
}: CategoryDetailProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 2;

  if (!slug) {
    notFound();
  }

  const { products, totalCount, totalPages } = await getByCategoryProductAction(
    slug,
    currentPage,
    limit,
  );
  const category = CATEGORIES[slug];
  const latestsproducts = await getLatestProductsByCategory(slug);
  const slugName = formatSlug(slug);

  return (
    <div className="max-w-7xl mx-auto space-y-4 p-4">
      <h1>{slugName}</h1>
      {category?.types && category.types.length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-600 text-xl">
            Sub Categories
          </h2>

          <div className="flex flex-wrap gap-3 bg-gray-200 p-2 rounded-sm ">
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

      <div>
        <ProductSlider
          products={latestsproducts}
          sliderId="categories-latest-slider"
          title={`${slugName} Latest Products`}
        />
      </div>
      <div>
        <h3></h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          baseUrl={`/categories/${slug}`}
        />
      </div>
    </div>
  );
}
