import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { EcommerceViewComponent } from './ecommerce-view.component';

export const routes: Routes = [
  {
    path: '',
    component: EcommerceViewComponent,
    children: [
      {
        path: '',
        outlet: 'products',
        loadComponent: () =>
          loadRemoteModule({
            remoteEntry: 'http://localhost:4201/remoteEntry.json',
            exposedModule: './Component',
          }).then((m) => m.AppComponent),
      },
      {
        path: '',
        outlet: 'cart',
        loadComponent: () =>
          loadRemoteModule({
            remoteEntry: 'http://localhost:4202/remoteEntry.json',
            exposedModule: './Component',
          }).then((m) => m.AppComponent),
      },
    ],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4203/remoteEntry.json',
        exposedModule: './Routes',
      }).then((m) => m.mfeRoutes),
  }
];
