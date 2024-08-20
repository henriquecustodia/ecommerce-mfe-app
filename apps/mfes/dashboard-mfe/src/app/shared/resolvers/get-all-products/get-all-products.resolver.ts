import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductsService } from '@ecommerce-shell/access-data';
import { Product } from '@ecommerce-shell/models';
import { Observable } from 'rxjs';

export const getAllProductsResolver: ResolveFn<Observable<Product[]>> = () => {
  const productService = inject(ProductsService);
  return productService.getProducts();
};
