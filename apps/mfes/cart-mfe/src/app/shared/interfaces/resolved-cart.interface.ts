import { Product } from '@ecommerce-shell/models';

export interface ResolvedCartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface ResolvedCart {
  items: ResolvedCartItem[];
}
