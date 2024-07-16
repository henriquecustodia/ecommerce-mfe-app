import { inject, Injectable } from '@angular/core';
import { EventHandlerService } from '@ecommerce-shell/event-handler';

@Injectable({
    providedIn: 'root'
})
export class CartEventHandlerService {

    eventHandlerService = inject(EventHandlerService)

    updateCart() {
        this.eventHandlerService.emit('update-cart');
    }
    
    onCartUpdated() {
        return this.eventHandlerService.listen('update-cart');
    }

}