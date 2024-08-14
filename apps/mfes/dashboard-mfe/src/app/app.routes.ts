import { Route } from '@angular/router';
import { AppComponent } from './app.component';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/list/list.component').then((m) => m.ListComponent),
  }
];

export const mfeRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    children: appRoutes
  }
];
