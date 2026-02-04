"use client";
import { CATEGORIES_ARRAY } from "@/lib/constants/categories";
import { headerLinks } from "@/lib/constants/HeaderLinks";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, MenuSquareIcon } from "lucide-react";

export default function () {
  const pathname = usePathname();

  return (
    <header className=" w-full bg-gray-300  px-6  py-1 flex md:block items-center justify-between">
      <div>
        <div className="h-16 text-gray-600   text-md font-semi-bold flex items-center justify-between">
          {/* BRAND */}
          <div className="flex items-center gap-1 text-2xl bg-amber-300 p-2 rounded-md">
            <span className="font-extrabold bg-gray-700 text-white px-4 rounded-r-2xl ">
              Next{" "}
            </span>
            Furniture
          </div>
          {/* LINKS */}
          <nav className="hidden md:block">
            <ul className="flex gap-6 text-gray-800">
              {headerLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-2 transition-colors hover:text-black",
                        pathname === link.href &&
                          "text-gray-900 font-bold underline",
                      )}
                    >
                      <Icon size={18} />
                      <span>{link.label}</span>{" "}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
      {/* SUBNAV */}
      <div className="hidden md:flex items-center justify-around overflow-hidden text-gray-600">
        {CATEGORIES_ARRAY.map((cat) => (
          <Link
            className={cn(
              "flex items-center gap-2 transition-colors hover:text-black",
              pathname.startsWith(`/categories/${cat.slug}`) &&
                "text-gray-900 font-bold underline",
            )}
            key={cat.label}
            href={`/categories/${cat.slug}`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* MOBILE NAV */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 text-gray-700 hover:text-black transition-colors">
              <Menu size={28} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-gray-200 border-gray-300 w-75"
          >
            <SheetHeader className="text-left border-b border-gray-300 pb-6">
              <SheetTitle className="flex items-center gap-1 text-xl">
                <span className="font-extrabold bg-gray-700 text-white px-3 py-1 rounded-r-2xl">
                  Next
                </span>
                Furniture
              </SheetTitle>
            </SheetHeader>

            {/* Header Links */}
            <div className="flex flex-col gap-2 mt-6">
              {headerLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-4 p-3 rounded-xl text-lg font-medium transition-all",
                        pathname === link.href
                          ? "bg-amber-300 text-gray-900 font-bold"
                          : "hover:bg-gray-300 text-gray-600",
                      )}
                    >
                      <Icon size={20} />
                      {link.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </div>

            {/* Categories */}
            <div className="mt-6 pt-6 border-t border-gray-300">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4 px-3">
                Categories
              </p>
              <div className="flex flex-col gap-1">
                {CATEGORIES_ARRAY.map((cat) => (
                  <SheetClose asChild key={cat.slug}>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className={cn(
                        "p-3 rounded-xl text-base font-medium transition-all",
                        pathname.startsWith(`/categories/${cat.slug}`)
                          ? "bg-amber-300 text-gray-900 font-bold"
                          : "hover:bg-gray-300 text-gray-600",
                      )}
                    >
                      {cat.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
