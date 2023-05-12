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
    loadComponent: () =>
      import('./simple-web-worker/simple-web-worker.component').then(
        (m) => m.SimpleWebWorkerComponent
      ),
  },
  {
    path: 'comlink-web-worker',
    loadComponent: () =>
      import('./comlink-web-worker/comlink-web-worker.component').then(
        (m) => m.ComlinkWebWorkerComponent
      ),
  },
];
