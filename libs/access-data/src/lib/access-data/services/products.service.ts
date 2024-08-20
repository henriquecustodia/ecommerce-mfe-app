import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductPayload, Product } from '@ecommerce-shell/models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  httpClient = inject(HttpClient);

  getProducts() {
    return this.httpClient.get<Product[]>('/api/products');
  }

  getProductById(id: string) {
    return this.httpClient.get<Product>(`/api/products/${id}`);
  }

  addProduct(product: ProductPayload) {
    return this.httpClient.post<Product>('/api/products', product);
  }

  changeProduct(id: string, product: ProductPayload) {
    return this.httpClient.put<Product>(`/api/products/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.httpClient.delete<Product>(`/api/products/${id}`);
  }
}
