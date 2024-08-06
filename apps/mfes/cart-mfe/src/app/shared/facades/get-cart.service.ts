import { inject, Injectable } from '@angular/core';
import { CartService, ProductsService } from '@ecommerce-shell/access-data';
import { map, switchMap, forkJoin, Observable } from 'rxjs';
import { ResolvedCart } from '../interfaces/resolved-cart.interface';

@Injectable({
  providedIn: 'root',
})
export class GetCartFacadeService {
  cartService = inject(CartService);
  productsService = inject(ProductsService);

  getCart(): Observable<ResolvedCart> {
    return this.cartService.get().pipe(
      map(({ items }) =>
        items.map(item => {
          return this.productsService.getProductById(item.productId).pipe(
            map((product) => {
              return { ...item, product };
            })
          );
        })
      ),
      switchMap((observables) => forkJoin(observables)),
      map((items) => {
        return {
          items,
        };
      })
    );
  }
}
