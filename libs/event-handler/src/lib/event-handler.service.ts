import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventHandlerService {

    emit(eventName: string): void {
        window.dispatchEvent(new Event(eventName));
    }
    
    listen(eventName: string): Observable<void> {
        return new Observable((observer) => {
            window.addEventListener(eventName, () => {
                observer.next();
            })
        })
    }

}