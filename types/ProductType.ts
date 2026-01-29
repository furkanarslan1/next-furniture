export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  discountRate: number;
  category_slug: string;
  typeSlug: string;
  isActive: boolean;
  attributes: {
    key: string;
    value: string;
  }[];
  images: {
    url: string;
    alt?: string;
  }[];
  createdAt: string;
}
