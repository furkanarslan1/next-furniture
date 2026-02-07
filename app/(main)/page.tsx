import ProductSlider from "@/components/product/ProductSlider";
import { getDiscountProductsAction } from "../(actions)/product/getDiscountProducts";
import { getLatestProductsAction } from "../(actions)/product/getLatestProductAction";

import HomeHeroes from "./_components/HomeHeroes";
import HomeInfoSlider from "./_components/HomeInfoSlider";
import HomeCategories from "./_components/HomeCategories";
import HomeVideoHero from "./_components/HomeVideoHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Renovate your home with modern and stylish furniture. The latest products, discounted offers and a wide selection of categories.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const latestProducts = await getLatestProductsAction();
  const discountProducts = await getDiscountProductsAction();
  return (
    <div>
      <HomeHeroes />

      <div className="max-w-7xl mx-auto p-2">
        <HomeInfoSlider />
        <ProductSlider
          products={latestProducts}
          sliderId="home-latest-slider"
          title="Latest Products"
        />
        <HomeVideoHero />
        <HomeCategories />
        <ProductSlider
          products={discountProducts}
          sliderId="home-discount-slider"
          title="Discount Products"
        />
      </div>
    </div>
  );
}
