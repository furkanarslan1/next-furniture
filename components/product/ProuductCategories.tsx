"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface Category {
  id: string;
  label: string;
  slug: string;
}

interface ProductCategoriesProps {
  categories: Category[];
}

export default function ProuductCategories({
  categories,
}: ProductCategoriesProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedCategory = searchParams.get("category") || "all";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-4 text-sm">
      <Swiper spaceBetween={9} slidesPerView={"auto"} freeMode>
        <SwiperSlide style={{ width: "auto" }}>
          <button
            onClick={() => handleChange("all")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-black text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
        </SwiperSlide>
        {categories.map((cat) => (
          <SwiperSlide key={cat.id} style={{ width: "auto" }}>
            <div
              onClick={() => handleChange(cat.slug)}
              className={`px-4 py-2 rounded-md cursor-pointer text-sm ${
                cat.slug === selectedCategory ? "bg-white" : "bg-gray-200"
              }`}
            >
              {cat.label}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
