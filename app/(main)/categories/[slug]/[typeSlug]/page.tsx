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

interface TypeSlugProps {
  params: Promise<{
    slug: string;
    typeSlug: string;
  }>;
}

export default async function TypeSlugPage({ params }: TypeSlugProps) {
  const { typeSlug, slug } = await params;

  const products = await getBySubCategoryProductAction(typeSlug);

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
            products={products}
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
      </div>
    </div>
  );
}
