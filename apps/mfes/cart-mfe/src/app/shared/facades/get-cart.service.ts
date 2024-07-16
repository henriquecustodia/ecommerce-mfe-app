import { inject, Injectable } from '@angular/core';
import { CartService, ProductsService } from '@ecommerce-shell/access-data';
import { map, switchMap, forkJoin, Observable } from 'rxjs';
import { ResolvedCart } from '../interfaces/resolved-cart.interface';

@Injectable({
  providedIn: 'root'
})
export class GetCartFacadeService {
  cartService = inject(CartService);
  productsService = inject(ProductsService);
  
  getCart(): Observable<ResolvedCart> {
    return this.cartService.get().pipe(
      map(({ products }) =>
        products.map((id) => this.productsService.getProductById(id))
      ),
      switchMap((observables) => forkJoin(observables)),
      map((products) => {
        return {
          products,
        };
      })
    );
  }

}
