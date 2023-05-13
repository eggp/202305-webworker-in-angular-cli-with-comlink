import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { NativeWorkerDemoComponent } from './native-worker-demo.component';

export const ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./native-worker-demo.component').then(
        (m) => m.NativeWorkerDemoComponent
      ),
    resolve: {
      worker: () =>
        // create native worker
        new Worker(new URL('./worker/simple.worker', import.meta.url)),
    },
    canDeactivate: [
      (
        component: NativeWorkerDemoComponent,
        currentRoute: ActivatedRouteSnapshot
      ) => {
        // destroy worker
        (currentRoute.data['worker'] as Worker).terminate();
        return true;
      },
    ],
  },
];
