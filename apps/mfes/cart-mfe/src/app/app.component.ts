import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartService, ProductsService } from '@ecommerce-shell/access-data';
import { EventHandlerService } from '@ecommerce-shell/event-handler';
import { Cart, Product } from '@ecommerce-shell/models';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

class CartViewModel {
  products: Product[] = [];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  cartService = inject(CartService);
  productsService = inject(ProductsService);
  eventHandlerService = inject(EventHandlerService);

  cartVM = signal<CartViewModel>(new CartViewModel());

  products = computed(() => this.cartVM().products);

  ngOnInit(): void {
    this.getCart().subscribe((cart) => {
      this.cartVM.set(cart);
    });

    this.eventHandlerService.listen('cart-updated').subscribe(() => {
      this.getCart().subscribe((cart) => {
        this.cartVM.set(cart);
      });
    });
  }

  getCart(): Observable<CartViewModel> {
    return this.cartService.get().pipe(
      map(({ products }) =>
        products.map((id) => this.productsService.getProductById(id))
      ),
      switchMap((observables) => forkJoin(observables)),
      map((products) => {
        return {
          products,
        };
      })
    );
  }
}
