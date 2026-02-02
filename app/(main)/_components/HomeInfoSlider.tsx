"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Dokunmatik kaydırma kararlılığı için eklendi

import { Truck, ShieldCheck, Wrench, PackageCheck, Gift } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const serviceFeatures = [
  { label: "Scheduled delivery", icon: Truck },
  { label: "2-year warranty", icon: ShieldCheck },
  { label: "Free installation", icon: Wrench },
  { label: "Protective packaging", icon: PackageCheck },
  { label: "Free delivery", icon: Gift },
];

export default function HomeInfoSlider() {
  return (
    <div className="w-full  bg-muted/30 py-4">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: serviceFeatures.length, pagination: false },
        }}
        className="px-8! pb-12! "
      >
        {serviceFeatures.map(({ label, icon: Icon }, index) => (
          <SwiperSlide key={index} className="h-full">
            <div className="flex items-center justify-center md:justify-start gap-3 rounded-lg bg-white px-5 py-4 shadow-sm border">
              <Icon className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                {label}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
