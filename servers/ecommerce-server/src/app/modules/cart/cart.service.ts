import { Injectable } from '@nestjs/common';
import { Cart } from '@ecommerce-shell/models';

@Injectable()
export class CartService {
  get(): Cart {
    return {
      items: [
        {
          id: '01917222-bef4-7ee7-beb7-5eb2c00d5365',
          productId: '441b',
          quantity: 1,
        },
      ],
    };
  }
}
