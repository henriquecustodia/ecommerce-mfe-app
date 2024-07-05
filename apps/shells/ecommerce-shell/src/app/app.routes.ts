import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    outlet: 'products',
    loadComponent: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4202/remoteEntry.json',
        exposedModule: './Component',
      }).then((m) => m.AppComponent),
  },
  {
    path: '',
    outlet: 'cart',
    loadComponent: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4201/remoteEntry.json',
        exposedModule: './Component',
      }).then((m) => m.AppComponent),
  },
];
