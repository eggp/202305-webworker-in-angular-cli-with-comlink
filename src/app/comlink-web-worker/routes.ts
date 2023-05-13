import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { SimpleWebWorkerComponent } from '../simple-web-worker/simple-web-worker.component';
import { ComlinkWorker } from './worker/comlink.worker';
import { proxy, releaseProxy, Remote, wrap } from 'comlink';

export const ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./comlink-web-worker.component').then(
        (m) => m.ComlinkWebWorkerComponent
      ),
    resolve: {
      worker: () => {
        // create native worker
        const rawWorker = new Worker(
          new URL('./worker/comlink.worker', import.meta.url)
        );
        // create proxy generator
        const workerProxy = wrap<ComlinkWorker>(rawWorker);

        return (
          (
            // @ts-ignore
            new workerProxy(
              // fill constructor params
              'paramString',
              proxy((param: string) => console.log('inited paramFn: ', param))
            ) as Promise<Remote<ComlinkWorker>>
          ).then((proxyWorker) => ({
            rawWorker,
            proxyWorker,
            xxx: workerProxy,
          }))
        );
      },
    },
    canDeactivate: [
      async (
        component: SimpleWebWorkerComponent,
        currentRoute: ActivatedRouteSnapshot
      ) => {
        await currentRoute.data['worker'].proxyWorker[releaseProxy]();
        (currentRoute.data['worker'].rawWorker as Worker).terminate();
        return true;
      },
    ],
  },
  // ...
];
