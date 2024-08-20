import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { getAllProductsResolver } from './shared/resolvers/get-all-products/get-all-products.resolver';
import { getProductByIdResolver } from './shared/resolvers/get-all-products/get-product-by-id.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    resolve: {
      products: getAllProductsResolver
    },
    loadComponent: () =>
      import('./pages/list/list.component').then((m) => m.ListComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/create/create.component').then((m) => m.CreateComponent),
  },
  {
    path: 'edit/:id',
    resolve: {
      product: getProductByIdResolver
    },
    loadComponent: () =>
      import('./pages/edit/edit.component').then((m) => m.EditComponent),
  },
];

export const mfeRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    children: appRoutes
  }
];
