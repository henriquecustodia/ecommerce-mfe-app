import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cart } from '@ecommerce-shell/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  httpClient = inject(HttpClient);
  
  get () {
    return this.httpClient.get<Cart>('/api/cart');
  }

}
