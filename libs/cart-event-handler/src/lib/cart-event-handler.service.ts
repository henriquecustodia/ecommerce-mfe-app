import { Injectable } from '@angular/core';
import { EventHandler } from '@ecommerce-shell/event-handler';

@Injectable({
  providedIn: 'root',
})
export class CartEventHandlerService {
  readonly updateCart = new EventHandler('update-cart');
}
