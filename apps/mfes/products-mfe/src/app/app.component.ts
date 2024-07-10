import { Component, inject } from '@angular/core';
import { ProductsService } from '@ecommerce-shell/access-data';
import { CommonModule } from '@angular/common';
import { Product } from '@ecommerce-shell/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  productsService = inject(ProductsService);

  productsService$ = this.productsService.getProducts();
  
  onBuy(product: Product) {
    
  }
}
