import { ActivatedRouteSnapshot, Route } from '@angular/router';
import type NativeWorkerDemoComponent from '../native-worker-demo/native-worker-demo.component';
import {
  destroyExcelWorkerProvider,
  excelWorkerProvider,
} from './provider/worker.provider';

export const ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./excel-writer-with-comlink-worker-demo.component'),
    resolve: {
      worker: excelWorkerProvider,
    },
    canDeactivate: [
      async (
        component: NativeWorkerDemoComponent,
        currentRoute: ActivatedRouteSnapshot
      ) => {
        await destroyExcelWorkerProvider(currentRoute.data['worker']);
        return true;
      },
    ],
  },
];

export default ROUTES;
