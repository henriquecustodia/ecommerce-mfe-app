import { Controller, Get } from '@nestjs/common';
import { Cart } from '@ecommerce-shell/models';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(): Cart {
    return this.cartService.get();
  }
}
