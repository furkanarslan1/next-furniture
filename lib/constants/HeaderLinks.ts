import { HeaderLink } from "@/types/HeaderLinkType";
import { Home, Info, Percent, Store, StoreIcon } from "lucide-react";

export const headerLinks: HeaderLink[] = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },

  {
    href: "/discount-products",
    label: "Discount Products",
    icon: Percent,
  },
  {
    href: "/our-store",
    label: "Our Store",
    icon: Store,
  },
  {
    href: "/about-us",
    label: "Why Next Furniture",
    icon: Info,
  },
];
