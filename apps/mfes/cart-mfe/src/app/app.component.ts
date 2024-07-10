import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartService } from '@ecommerce-shell/access-data';
import { Cart } from '@ecommerce-shell/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  cartService = inject(CartService);

  cart = signal<Cart | null>(null);

  ngOnInit(): void {
    this.cartService.get().subscribe((cart) => {
      this.cart.set(cart);
    })  
  }

}
