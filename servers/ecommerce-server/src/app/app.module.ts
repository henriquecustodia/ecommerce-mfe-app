import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [ProductsModule, CartModule],
})
export class AppModule {}
