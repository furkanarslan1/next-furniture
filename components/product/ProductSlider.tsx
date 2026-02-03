"use client";

import { ProductCardType } from "@/types/ProductType";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";

interface ProductSliderProps {
  products: ProductCardType[];
  title: string;
  sliderId: string;
}

export default function ProductSlider({
  products,
  title,
  sliderId,
}: ProductSliderProps) {
  const prevClass = `${sliderId}-prev`;
  const nextClass = `${sliderId}-next`;

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <h3 className="font-bold text-2xl">{title}</h3>
      <div className="relative">
        <button
          className={`${prevClass} absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center text-black cursor-pointer hover:scale-110 transition-transform`}
        >
          <ChevronLeft size={40} />
        </button>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="px-8!"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={`${nextClass} absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center text-black cursor-pointer hover:scale-110 transition-transform`}
        >
          <ChevronRight size={40} />
        </button>
      </div>
    </div>
  );
}
