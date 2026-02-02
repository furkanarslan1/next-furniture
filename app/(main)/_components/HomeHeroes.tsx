import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function HomeHeroes() {
  const supabase = await createClient();

  const { data: heroes, error } = await supabase
    .from("hero_slides")
    .select("*")
    .eq("is_active", true)
    .order("order_index", { ascending: true });

  if (!heroes || heroes.length === 0) return null;
  return (
    <div className="relative w-full overflow-hidden">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {heroes.map((hero, index) => (
            <CarouselItem
              key={hero.id}
              className="relative h-[60vh] md:h-[80vh] w-full"
            >
              <Link href={hero.target_url || "#"}>
                <div className="relative h-full w-full">
                  <Image
                    src={hero.image_url}
                    alt={hero.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="100vw"
                  />

                  <div className="absolute inset-0 bg-black/30 flex flex-col justify-end items-start text-white p-8 text-center">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 drop-shadow-md">
                      {hero.title}
                    </h2>
                    {hero.subtitle && (
                      <p className="text-lg md:text-2xl opacity-90 mb-8 max-w-2xl drop-shadow-md">
                        {hero.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}
