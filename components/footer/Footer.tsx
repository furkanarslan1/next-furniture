import { CATEGORIES_ARRAY } from "@/lib/constants/categories";
import { headerLinks } from "@/lib/constants/HeaderLinks";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-gray-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* BRAND SECTION */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-1 text-2xl">
              <span className="font-extrabold bg-amber-300 text-gray-900 px-4 py-1 rounded-r-2xl">
                Next
              </span>
              <span className="text-white font-bold">Furniture</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Premium furniture for your home. Quality craftsmanship and modern
              designs since 2020. Transform your space with us.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {headerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-amber-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <h4 className="text-white font-bold mb-6">Categories</h4>
            <ul className="space-y-4">
              {CATEGORIES_ARRAY.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-sm hover:text-amber-300 transition-colors"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER SECTION */}
          <div className="space-y-6">
            <h4 className="text-white font-bold">Stay Updated</h4>
            <p className="text-sm text-gray-400">
              Subscribe to get the latest furniture collections and exclusive
              offers.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-gray-600 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-amber-300 outline-none transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-amber-300 text-gray-900 px-4 rounded-xl hover:bg-amber-400 transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-gray-600 flex flex-col md:row-reverse md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Next Furniture. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
