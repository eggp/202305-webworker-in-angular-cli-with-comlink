import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: 'native-worker-demo',
    loadChildren: () =>
      import('./native-worker-demo/routes').then((m) => m.ROUTES),
  },
  {
    path: 'comlink-worker-demo',
    loadChildren: () =>
      import('./comlink-worker-demo/routes').then((m) => m.ROUTES),
  },
];
