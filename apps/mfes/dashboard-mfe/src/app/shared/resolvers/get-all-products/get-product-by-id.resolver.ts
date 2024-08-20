import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ProductsService } from '@ecommerce-shell/access-data';
import { Product } from '@ecommerce-shell/models';
import { Observable } from 'rxjs';

export const getProductByIdResolver: ResolveFn<Observable<Product>> = (route: ActivatedRouteSnapshot) => {
  const productService = inject(ProductsService);

  const id = route.paramMap.get('id') as string;

  return productService.getProductById(id);
};
