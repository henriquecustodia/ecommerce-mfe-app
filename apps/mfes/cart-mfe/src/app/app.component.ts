import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartService } from './shared/services/cart.service';
import { Cart } from './shared/interfaces/cart.interface';

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
    this.cartService.getOne(5).subscribe((cart) => {
      this.cart.set(cart);
    })  
  }

}
