import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cart, CartItem, Product } from '@ecommerce-shell/models';
import { uuid } from '@ecommerce-shell/utils/uuid';
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
        return cart.items;
      }),
      switchMap((items) => {
        const hasProduct = items.some((item) => item.productId === product.id);

        if (hasProduct) {
          const item = items.find((item) => item.productId === product.id);

          if (item) {
            item.quantity += 1;
          }
        } else {
          items.push({
            id: uuid(),
            productId: product.id,
            quantity: 1,
          });
        }

        const payload: Cart = {
          items,
        };

        return this.httpClient.put('/api/cart', payload);
      })
    );
  }

  updateItemQuantity(itemId: string, quantity: number) {
    return this.get().pipe(
      map((cart) => {
        return cart.items;
      }),
      switchMap((items) => {
        const itemIndex = items.findIndex((item) => item.id === itemId);

        const item = items[itemIndex];

        const newItem: CartItem = {
          ...item,
          quantity,
        };

        items.splice(itemIndex, 1, newItem);

        const payload: Cart = {
          items,
        };

        return this.httpClient.put('/api/cart', payload);
      })
    );
  }

  removeProduct(productId: string) {
    return this.get().pipe(
      map((cart) => cart.items),
      switchMap((items) => {
        const payload: Cart = {
          items: items.filter((item) => item.productId !== productId),
        };

        return this.httpClient.put<Cart>('/api/cart', payload);
      })
    );
  }
}
