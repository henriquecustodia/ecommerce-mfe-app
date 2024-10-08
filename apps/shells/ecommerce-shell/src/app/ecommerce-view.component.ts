import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ecommerce-view',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="navbar bg-primary">
      <div class="flex-1">
        <a class="btn btn-ghost text-base-100" routerLink="/">Minha lojinha</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li>
            <a class="btn btn-ghost text-base-100" routerLink="/dashboard"
              >Dashboard</a
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="flex">
      <div class="w-2/3">
        <router-outlet name="products"></router-outlet>
      </div>
      <div class="w-1/3">
        <router-outlet name="cart"></router-outlet>
      </div>
    </div>
  `,
})
export class EcommerceViewComponent {}
