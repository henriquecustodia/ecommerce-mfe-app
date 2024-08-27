import { Product } from "@ecommerce-shell/models";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsService {

  getProducts(): Product[] {
    return [
      {
        id: 'f728',
        title: 'qwdqwd',
        price: 22222,
        description: 'wqdqdd qwdqwdq wqd',
        image:
          'https://images.unsplash.com/photo-1512429234305-12fe5b0b0f07?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ];
  }
}
