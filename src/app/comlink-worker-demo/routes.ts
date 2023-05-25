import { ActivatedRouteSnapshot, Route } from '@angular/router';
import type NativeWorkerDemoComponent from '../native-worker-demo/native-worker-demo.component';
import {
  comlinkWorkerProvider,
  destroyComlinkWorkerProvider,
} from './provider/worker.provider';

export const ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./comlink-worker-demo.component'),
    resolve: {
      worker: comlinkWorkerProvider,
    },
    canDeactivate: [
      async (
        component: NativeWorkerDemoComponent,
        currentRoute: ActivatedRouteSnapshot
      ) => {
        await destroyComlinkWorkerProvider(currentRoute.data['worker']);
        return true;
      },
    ],
  },
];

export default ROUTES;
