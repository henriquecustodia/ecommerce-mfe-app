export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
}

export type ProductPayload = Omit<Product, 'id'>;

