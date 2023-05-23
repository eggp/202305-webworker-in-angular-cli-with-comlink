import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { proxy, releaseProxy, Remote, wrap } from 'comlink';
import type NativeWorkerDemoComponent from '../native-worker-demo/native-worker-demo.component';
import { type ExcelWorker } from './worker/excel.worker';

export const ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./excel-writer-with-comlink-worker-demo.component'),
    resolve: {
      worker: () => {
        // create native worker
        const rawWorker = new Worker(
          new URL('./worker/excel.worker', import.meta.url)
        );
        // create proxy generator
        const workerProxy = wrap<ExcelWorker>(rawWorker);
        const workerProxyCreateInstancePromise =
          // @ts-ignore
          new workerProxy(
            // fill constructor params
            'paramString',
            proxy((param: string) => console.log('inited paramFn: ', param))
          ) as Promise<Remote<ExcelWorker>>;

        // TODO create type
        return workerProxyCreateInstancePromise.then((proxyWorker) => ({
          rawWorker,
          proxyWorker,
          xxx: workerProxy,
        }));
      },
    },
    canDeactivate: [
      async (
        component: NativeWorkerDemoComponent,
        currentRoute: ActivatedRouteSnapshot
      ) => {
        // call Comlink "onDestroy"
        await currentRoute.data['worker'].proxyWorker[releaseProxy]();
        // destroy worker
        (currentRoute.data['worker'].rawWorker as Worker).terminate();
        return true;
      },
    ],
  },
  // ...
];
