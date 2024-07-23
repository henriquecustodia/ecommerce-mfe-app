import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartEventHandlerService } from '@ecommerce-shell/cart-event-handler';
import { Product } from '@ecommerce-shell/models';
import { GetCartFacadeService } from './shared/facades/get-cart.service';
import { ResolvedCart } from './shared/interfaces/resolved-cart.interface';

class CartViewModel {
  products: Product[] = [];

  constructor(resolvedCart?: ResolvedCart) {
    if (resolvedCart) {
      this.products = resolvedCart.products;
    }
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  cartEventHandlerService = inject(CartEventHandlerService);
  getCartFacadeService = inject(GetCartFacadeService);

  cartVM = signal<CartViewModel>(new CartViewModel());

  products = computed(() => this.cartVM().products);

  ngOnInit(): void {
    this.getCart();

    this.cartEventHandlerService.updateCart.listen().subscribe(() => {
      this.getCart();
    });
  }

  getCart() {
    return this.getCartFacadeService.getCart().subscribe((cart) => {
      this.cartVM.set(cart);
    });
  }
}
