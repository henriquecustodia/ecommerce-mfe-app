import { Component, inject } from '@angular/core';
import { CartService, ProductsService } from '@ecommerce-shell/access-data';
import { CommonModule } from '@angular/common';
import { Product } from '@ecommerce-shell/models';
import { EventHandlerService } from '@ecommerce-shell/event-handler';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  productsService = inject(ProductsService);
  cartService = inject(CartService);
  eventHandlerService = inject(EventHandlerService);

  productsService$ = this.productsService.getProducts();
  
  onBuy(product: Product) {
    this.cartService.addProduct(product).subscribe(() => {
      this.eventHandlerService.emit('cart-updated');
    })
  }
}
