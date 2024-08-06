import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartEventHandlerService } from '@ecommerce-shell/cart-event-handler';
import { CartItem, Product } from '@ecommerce-shell/models';
import { GetCartFacadeService } from './shared/facades/get-cart.service';
import { CartService } from '@ecommerce-shell/access-data';
import { CurrencyPipe } from '@angular/common';
import { ResolvedCart, ResolvedCartItem } from './shared/interfaces/resolved-cart.interface';

class CartViewModel {
  #cart = signal<ResolvedCart | null>(null);

  items = computed(() => this.#cart()?.items);

  total = computed(() =>
    this.items()?.reduce(
      (total, { product, quantity }) => total + product.price * quantity,
      0
    )
  );

  setCart(cart: ResolvedCart) {
    this.#cart.set(cart);
  }

  removeItem(product: Product) {
    this.#cart.update((cart) => {
      if (!cart) {
        return cart;
      }

      const itemIndex = cart.items.findIndex(
        (item) => item.product.id !== product.id
      );
      cart.items.splice(itemIndex, 1);

      return cart;
    });
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
      this.cartVM.setCart(cart);
    });
  }

  onRemove(product: Product) {
    this.cartService.removeProduct(product.id).subscribe(() => {
      this.cartVM.removeItem(product);
    });
  }

  incrementQuantiy(item: ResolvedCartItem) {


    this.cartService
    .updateItemQuantity(item.id, item.quantity + 1)
    .subscribe(() => {
      this.getCart();
    });
  }

  decrementQuantiy(item: ResolvedCartItem) {
    if(item.quantity === 1) {
      return;
    }

    this.cartService
      .updateItemQuantity(item.id, item.quantity - 1)
      .subscribe(() => {
        this.getCart();
      });
  }
}
