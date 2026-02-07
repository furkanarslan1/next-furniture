import { getSimilarProductByCategory } from "@/app/(actions)/product/getSimilarProductByCategory";
import ProductSlider from "./ProductSlider";

interface SimilarProductsProps {
  category: string;
}
export default async function SimilarProducts({
  category,
}: SimilarProductsProps) {
  const simProducts = await getSimilarProductByCategory(category);
  return (
    <div>
      <ProductSlider
        products={simProducts}
        title="Similar Products"
        sliderId="similar-products-slider"
      />
    </div>
  );
}
