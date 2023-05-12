import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { type SimpleWebWorkerComponent } from './simple-web-worker/simple-web-worker.component';

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
    resolve: {
      worker: () =>
        new Worker(
          new URL('./simple-web-worker/worker/simple.worker', import.meta.url)
        ),
    },
    canDeactivate: [
      (
        component: SimpleWebWorkerComponent,
        currentRoute: ActivatedRouteSnapshot
      ) => {
        (currentRoute.data['worker'] as Worker).terminate();
        return true;
      },
    ],
  },
  {
    path: 'comlink-web-worker',
    loadComponent: () =>
      import('./comlink-web-worker/comlink-web-worker.component').then(
        (m) => m.ComlinkWebWorkerComponent
      ),
  },
];
