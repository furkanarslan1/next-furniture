import { ProductCardType } from "./ProductType";

export interface PaginatedResult {
  products: ProductCardType[];
  totalCount: number;
  totalPages: number;
}
