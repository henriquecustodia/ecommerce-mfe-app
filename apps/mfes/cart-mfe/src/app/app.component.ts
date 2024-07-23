import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartEventHandlerService } from '@ecommerce-shell/cart-event-handler';
import { Product } from '@ecommerce-shell/models';
import { GetCartFacadeService } from './shared/facades/get-cart.service';
import { CartService } from '@ecommerce-shell/access-data';
import { CurrencyPipe } from '@angular/common';

class CartViewModel {
  
  #products = signal<Product[]>([]);

  get products() {
    return computed(() => this.#products());
  }

  get total() {
    return computed(() => this.products().reduce((total, product) => total + product.price, 0));
  }

  setProducts(products: Product[]) {
    this.#products.set(products);
  }

  removeProduct(product: Product) {
    this.#products.update((products) => products.filter((p) => p.id !== product.id));
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  cartEventHandlerService = inject(CartEventHandlerService);
  getCartFacadeService = inject(GetCartFacadeService);
  cartService = inject(CartService);

  cartVM = new CartViewModel();

  ngOnInit(): void {
    this.getCart();

    this.cartEventHandlerService.updateCart.listen().subscribe(() => {
      this.getCart();
    });
  }

  getCart() {
    return this.getCartFacadeService.getCart().subscribe((cart) => {
      this.cartVM.setProducts(cart.products);
    });
  }

  onRemove(product: Product) {
    this.cartService.removeProduct(product.id).subscribe(() => {
      this.cartVM.removeProduct(product);
    });
  }
}
