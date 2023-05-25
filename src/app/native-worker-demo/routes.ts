import { ActivatedRouteSnapshot, Route } from '@angular/router';
import type NativeWorkerDemoComponent from './native-worker-demo.component';
import {
  destroyWorkerProvider,
  nativeWorkerProvider,
} from './provider/worker.provider';

export const ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./native-worker-demo.component'),
    resolve: {
      worker: nativeWorkerProvider,
    },
    canDeactivate: [
      (
        component: NativeWorkerDemoComponent,
        currentRoute: ActivatedRouteSnapshot
      ) => {
        destroyWorkerProvider(currentRoute.data as { worker: Worker });
        return true;
      },
    ],
  },
];

export default ROUTES;
