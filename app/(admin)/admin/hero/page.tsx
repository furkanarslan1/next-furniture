import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import HeroOrderSelect from "./_components/HeroOrderSelect";
import DeleteHeroButton from "./_components/DeleteHeroButton";

export default async function HeroPage() {
  const supabase = await createClient();

  const { data: heroes, error } = await supabase
    .from("hero_slides")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    return <div> An error occurred while loading the data:{error.message}</div>;
  }
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hero Menagment</h1>
          <p className="text-muted-foreground">
            You can manage homepage banner images from here.
          </p>
        </div>
        <Link href="/admin/hero/add">
          <Button className="gap-2">
            <PlusCircle size={18} />
            Add new a Hero
          </Button>
        </Link>
      </div>
      <div className="border rounded-lg bg-white overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-semibold text-sm border-b">
          <div className="col-span-2">Image</div>
          <div className="col-span-4">Title</div>
          <div className="col-span-2 text-center">State</div>
          <div className="col-span-2 text-center">Order</div>
          <div className="col-span-2 text-right">Delete</div>
        </div>

        <div className="divide-y">
          {heroes?.map((hero) => (
            <div
              key={hero.id}
              className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/20 transition-colors"
            >
              {/* Image */}
              <div className="col-span-2">
                <img
                  src={hero.image_url}
                  alt={hero.title}
                  className="w-full aspect-video object-cover rounded-md border"
                />
              </div>

              {/* Title ve Subtitle */}
              <div className="col-span-4">
                <p className="font-medium truncate">{hero.title}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {hero.target_url || "There is no Link"}
                </p>
              </div>

              {/* State (Badge) */}
              <div className="col-span-2 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${hero.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {hero.is_active ? "Active" : "Passive"}
                </span>
              </div>

              {/* Order Select */}
              <div className="col-span-2 flex justify-center">
                <HeroOrderSelect
                  heroId={hero.id}
                  oldOrder={hero.order_index}
                  totalCount={heroes.length}
                />
              </div>

              {/* Delete */}
              <div className="col-span-2 text-right">
                <DeleteHeroButton heroId={hero.id} />
              </div>
            </div>
          ))}

          {heroes?.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No heroes have been added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
