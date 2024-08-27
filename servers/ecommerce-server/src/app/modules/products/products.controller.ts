import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@ecommerce-shell/models';

@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(): Product[] {
    return this.productsService.getProducts();
  }
}
