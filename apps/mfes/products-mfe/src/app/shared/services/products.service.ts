import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../constants/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  httpClient = inject(HttpClient);
  
  getProducts() {
    return this.httpClient.get<Product[]>('https://fakestoreapi.com/products');
  }
}
