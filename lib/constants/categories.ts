import { CategoryInput } from "@/schemas/categoriesSchema";

export const CATEGORIES: Record<string, CategoryInput> = {
  "living-room": {
    slug: "living-room",
    label: "Living Room",
    types: [
      { slug: "sofa-set", label: "Sofa Set", isActive: true },
      { slug: "sofa", label: "Sofa", isActive: true },
      { slug: "armchair", label: "Armchair", isActive: true },
      { slug: "tv-unit", label: "TV Unit", isActive: true },
      {
        slug: "coffee-side-table",
        label: "Coffee / Side Table",
        isActive: true,
      },
    ],
  },

  bedroom: {
    slug: "bedroom",
    label: "Bedroom",
    types: [
      { slug: "bed", label: "Bed", isActive: true },
      { slug: "storage-bed", label: "Storage Bed", isActive: true },
      { slug: "wardrobe", label: "Wardrobe", isActive: true },
      { slug: "nightstand", label: "Nightstand", isActive: true },
      { slug: "dresser", label: "Dresser", isActive: true },
    ],
  },

  "dining-room": {
    slug: "dining-room",
    label: "Dining Room",
    types: [
      { slug: "dining-table", label: "Dining Table", isActive: true },
      { slug: "chair", label: "Chair", isActive: true },
      { slug: "sideboard", label: "Sideboard", isActive: true },
      { slug: "display-cabinet", label: "Display Cabinet", isActive: true },
    ],
  },

  "home-office": {
    slug: "home-office",
    label: "Home Office",
    types: [
      { slug: "desk", label: "Desk", isActive: true },
      { slug: "office-chair", label: "Office Chair", isActive: true },
      { slug: "bookcase", label: "Bookcase", isActive: true },
    ],
  },

  "kids-room": {
    slug: "kids-room",
    label: "Kids / Youth Room",
    types: [],
  },

  outdoor: {
    slug: "outdoor",
    label: "Garden & Balcony",
    types: [
      {
        slug: "outdoor-seating-set",
        label: "Outdoor Seating Set",
        isActive: true,
      },
      { slug: "sun-lounger", label: "Sun Lounger", isActive: true },
    ],
  },

  "storage-organization": {
    slug: "storage-organization",
    label: "Storage & Organization",
    types: [
      { slug: "cabinet", label: "Cabinet", isActive: true },
      { slug: "shelf", label: "Shelf", isActive: true },
      { slug: "shoe-rack", label: "Shoe Rack", isActive: true },
    ],
  },
};

// Kolay döngü kurmak için dizi hali
export const CATEGORIES_ARRAY = Object.values(CATEGORIES);
