import { Product, ProductCardType } from "@/types/ProductType";
import Image from "next/image";
import React from "react";

interface Productprops {
  product: ProductCardType;
}

export default function ProductCard({ product }: Productprops) {
  const hasDiscount = product.discount_rate > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discount_rate / 100)
    : product.price;

  console.log("product:", product);
  console.log("discount_rate:", product.discount_rate);
  return (
    <div className="space-y-2">
      <div className="relative w-full h-40">
        <Image
          src={product.images?.[0]?.url || "/product.webp"}
          alt={product.images?.[0]?.alt || product.title}
          fill
          className="object-cover object-center rounded-md"
        />
        {hasDiscount && (
          <span className="absolute top-1 right-2 bg-green-600 text-white rounded-full p-2 font-bold">
            {product.discount_rate}%
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold ">{product.title}</p>
        <div>
          {hasDiscount ? (
            <div className="flex items-center gap-2">
              <p className="text-sm line-through text-gray-400">
                ${product.price}
              </p>
              <p className="text-sm font-semibold text-green-600">
                ${discountedPrice.toFixed(2)}
              </p>
            </div>
          ) : (
            <p className="text-sm line-through text-gray-800">
              ${product.price}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
