import { CATEGORIES_ARRAY } from "@/lib/constants/categories";
import Image from "next/image";
import Link from "next/link";

export default function HomeCategories() {
  return (
    <section className="max-w-7xl mx-auto space-y-6 p-4">
      <h2 className="text-2xl font-bold">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {CATEGORIES_ARRAY.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="group relative overflow-hidden rounded-lg aspect-square"
          >
            <Image
              src={`/categories/${category.slug}.webp`}
              alt={category.label}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:bg-black/40" />
            <div className="absolute inset-0 flex items-end p-4">
              <h3 className="text-gray-600 font-semibold text-lg">
                {category.label}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
