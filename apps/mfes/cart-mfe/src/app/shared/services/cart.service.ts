import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  httpClient = inject(HttpClient);
  
  getAll () {
    return this.httpClient.get<Cart[]>('https://fakestoreapi.com/carts');
  }

  getOne (id: number) {
    return this.httpClient.get<Cart>(`https://fakestoreapi.com/carts/${id}`);
  } 

}
