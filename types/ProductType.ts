export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  discount_rate: number;
  category_slug: string;
  type_slug: string;
  is_active: boolean;
  attributes: {
    key: string;
    value: string;
  }[];
  images: {
    url: string;
    alt?: string;
  }[];
  created_at: string;
}

export type ProductCardType = Pick<
  Product,
  | "id"
  | "title"
  | "slug"
  | "price"
  | "discount_rate"
  | "images"
  | "category_slug"
  | "type_slug"
>;
