import { getBySubCategoryProductAction } from "@/app/(actions)/categories/getBySubCategoryProductAction";
import ProductCard from "@/components/product/ProductCard";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductSlider from "@/components/product/ProductSlider";
import { formatSlug } from "@/utils/string";
import Pagination from "@/components/Pagination";
import { getBySubCategoryLatestProducts } from "@/app/(actions)/categories/getBySubCategoryLatestProduct";

interface TypeSlugProps {
  params: Promise<{
    slug: string;
    typeSlug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function TypeSlugPage({
  params,
  searchParams,
}: TypeSlugProps) {
  const { typeSlug, slug } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 2;

  const { products, totalCount, totalPages } =
    await getBySubCategoryProductAction(typeSlug, currentPage, limit);

  const latestSubProducts = await getBySubCategoryLatestProducts(typeSlug);

  return (
    <div>
      <div className="max-w-7xl mx-auto space-y-4">
        <h1 className="font-semibold text-gray-600 text-xl">
          {typeSlug.split("-").join(" ").toUpperCase()}
        </h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/categories/${slug}`}>
                {slug.split("-").join(" ").toUpperCase()}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {typeSlug.split("-").join(" ").toUpperCase()}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <ProductSlider
            products={latestSubProducts}
            sliderId="subCat-latest-slider"
            title={`${formatSlug(typeSlug)} `}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-muted-foreground">No products found.</p>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          baseUrl={`/categories/${slug}/${typeSlug}`}
        />
      </div>
    </div>
  );
}
