import { Product } from "@/types/ProductType";
import React from "react";

interface ProductInformationsProps {
  product: Product;
}
export default function ProductInformations({
  product,
}: ProductInformationsProps) {
  return (
    <div className="space-y-4  p-2">
      {/* TITLE AND DESC */}
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-600 text-sm">{product.description}</p>

      {/* PRICE */}
      <div>
        {product.discount_rate > 0 ? (
          <div className="space-y-2">
            <p className="bg-green-600 text-white p-2 rounded-xl w-fit text-md font-bold">
              Discount rate: {product.discount_rate}%
            </p>
            <div className="flex items-center gap-2">
              <span className="line-through text-gray-400">
                ${product.price}
              </span>
              <span className="text-green-600 font-bold">
                {" "}
                $
                {(product.price * (1 - product.discount_rate / 100)).toFixed(2)}
              </span>
            </div>
          </div>
        ) : (
          <span className="font-bold">${product.price}</span>
        )}
      </div>
    </div>
  );
}
