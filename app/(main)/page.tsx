import ProductSlider from "@/components/product/ProductSlider";
import { getDiscountProductsAction } from "../(actions)/product/getDiscountProducts";
import { getLatestProductsAction } from "../(actions)/product/getLatestProductAction";

import HomeHeroes from "./_components/HomeHeroes";
import HomeInfoSlider from "./_components/HomeInfoSlider";
import HomeCategories from "./_components/HomeCategories";

export default async function Home() {
  const latestProducts = await getLatestProductsAction();
  const discountProducts = await getDiscountProductsAction();
  return (
    <div>
      <HomeHeroes />
      <HomeInfoSlider />
      <ProductSlider
        products={latestProducts}
        sliderId="home-latest-slider"
        title="Latest Products"
      />
      <HomeCategories />
      <ProductSlider
        products={discountProducts}
        sliderId="home-discount-slider"
        title="Discount Products"
      />
    </div>
  );
}
