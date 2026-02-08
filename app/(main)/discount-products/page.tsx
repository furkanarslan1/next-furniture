import { getAllDiscountProducts } from "@/app/(actions)/product/getAllDiscountProducts";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/product/ProductCard";
import React from "react";

interface DiscountProductProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function DiscountProductPage({
  searchParams,
}: DiscountProductProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 6;

  const { products, totalCount, totalPages } = await getAllDiscountProducts(
    currentPage,
    limit,
  );
  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      <h1 className="font-bold text-2xl ">Discount Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        baseUrl="/discount-products"
      />
    </div>
  );
}
