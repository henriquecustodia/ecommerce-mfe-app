export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}
