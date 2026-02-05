"use client";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

interface ProductGalleryProps {
  images: {
    url: string;
    alt?: string;
  }[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <div>
      <Swiper
        modules={[Thumbs, Pagination, Navigation]}
        thumbs={{ swiper: thumbsSwiper }}
        pagination={{ clickable: true }}
        navigation
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-video">
              <Image
                src={image.url}
                alt={image.alt || title}
                fill
                className="object-cover object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={10}
        watchSlidesProgress
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-20 w-20">
              <Image
                src={image.url}
                alt={image.alt || title}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
