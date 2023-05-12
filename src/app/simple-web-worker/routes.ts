import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { SimpleWebWorkerComponent } from './simple-web-worker.component';

export const ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./simple-web-worker.component').then(
        (m) => m.SimpleWebWorkerComponent
      ),
    resolve: {
      worker: () =>
        // create native worker
        new Worker(new URL('./worker/simple.worker', import.meta.url)),
    },
    canDeactivate: [
      (
        component: SimpleWebWorkerComponent,
        currentRoute: ActivatedRouteSnapshot
      ) => {
        // destroy worker
        (currentRoute.data['worker'] as Worker).terminate();
        return true;
      },
    ],
  },
];
