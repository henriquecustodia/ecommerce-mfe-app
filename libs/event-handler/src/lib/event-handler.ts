import { Observable } from 'rxjs';

export class EventHandler {
  constructor(private eventName: string) {}

  emit(): void {
    window.dispatchEvent(new Event(this.eventName));
  }

  listen(): Observable<void> {
    return new Observable((observer) => {
      window.addEventListener(this.eventName, () => {
        observer.next();
      });
    });
  }
}
