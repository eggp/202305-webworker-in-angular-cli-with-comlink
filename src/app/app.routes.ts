import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'simple-web-worker',
    loadChildren: () =>
      import('./simple-web-worker/routes').then((m) => m.ROUTES),
  },
  {
    path: 'comlink-web-worker',
    loadChildren: () =>
      import('./comlink-web-worker/routes').then((m) => m.ROUTES),
  },
];
