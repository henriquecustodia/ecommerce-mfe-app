import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cart, Product } from '@ecommerce-shell/models';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  httpClient = inject(HttpClient);

  get() {
    return this.httpClient.get<Cart>('/api/cart');
  }

  addProduct(product: Product) {
    return this.get().pipe(
      map((cart) => {
        return cart.products
      }),
      switchMap((products) => {
        const payload: Cart = {
          products: [...products, product.id],
        };

        return this.httpClient.put('/api/cart', payload);
      })
    );
  }
}
