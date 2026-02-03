"use client";

import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Product } from "@/types/ProductType";

interface ProductsProps {
  latestProducts: Product[];
}

export default function LatestProducts({ latestProducts }: ProductsProps) {
  return (
    <div>
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        spaceBetween={16}
        className="px-8! pb-12! "
      >
        {latestProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
