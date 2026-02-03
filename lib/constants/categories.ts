import { CategoryInput } from "@/schemas/categoriesSchema";

export const CATEGORIES: Record<string, CategoryInput> = {
  "living-room": {
    slug: "living-room",
    label: "Living Room",
    types: [
      { slug: "sofa-set", label: "Sofa Set", is_active: true },
      { slug: "sofa", label: "Sofa", is_active: true },
      { slug: "armchair", label: "Armchair", is_active: true },
      { slug: "tv-unit", label: "TV Unit", is_active: true },
      {
        slug: "coffee-side-table",
        label: "Coffee / Side Table",
        is_active: true,
      },
    ],
  },

  bedroom: {
    slug: "bedroom",
    label: "Bedroom",
    types: [
      { slug: "bed", label: "Bed", is_active: true },
      { slug: "storage-bed", label: "Storage Bed", is_active: true },
      { slug: "wardrobe", label: "Wardrobe", is_active: true },
      { slug: "nightstand", label: "Nightstand", is_active: true },
      { slug: "dresser", label: "Dresser", is_active: true },
    ],
  },

  "dining-room": {
    slug: "dining-room",
    label: "Dining Room",
    types: [
      { slug: "dining-table", label: "Dining Table", is_active: true },
      { slug: "chair", label: "Chair", is_active: true },
      { slug: "sideboard", label: "Sideboard", is_active: true },
      { slug: "display-cabinet", label: "Display Cabinet", is_active: true },
    ],
  },

  "home-office": {
    slug: "home-office",
    label: "Home Office",
    types: [
      { slug: "desk", label: "Desk", is_active: true },
      { slug: "office-chair", label: "Office Chair", is_active: true },
      { slug: "bookcase", label: "Bookcase", is_active: true },
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
        is_active: true,
      },
      { slug: "sun-lounger", label: "Sun Lounger", is_active: true },
    ],
  },

  "storage-organization": {
    slug: "storage-organization",
    label: "Storage & Organization",
    types: [
      { slug: "cabinet", label: "Cabinet", is_active: true },
      { slug: "shelf", label: "Shelf", is_active: true },
      { slug: "shoe-rack", label: "Shoe Rack", is_active: true },
    ],
  },
};

// Kolay döngü kurmak için dizi hali
export const CATEGORIES_ARRAY = Object.values(CATEGORIES);
