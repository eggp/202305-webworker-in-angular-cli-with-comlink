import { proxy, releaseProxy, Remote, wrap } from 'comlink';
import { type ComlinkWorker } from '../worker/comlink.worker';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface ComlinkWorkerResolveData {
  rawWorker: Worker;
  proxyWorker: Remote<ComlinkWorker>;
}

export const comlinkWorkerProvider = (): Promise<ComlinkWorkerResolveData> => {
  // create native worker
  const rawWorker = new Worker(
    new URL('./../worker/comlink.worker', import.meta.url)
  );
  // create proxy generator
  const workerProxy = wrap<ComlinkWorker>(rawWorker);
  const workerProxyCreateInstancePromise =
    // @ts-ignore
    new workerProxy(
      // fill constructor params
      'paramString',
      proxy((param: string) => console.log('inited paramFn: ', param))
    ) as Promise<Remote<ComlinkWorker>>;

  return workerProxyCreateInstancePromise.then((proxyWorker) => ({
    rawWorker,
    proxyWorker,
  }));
};

export const destroyComlinkWorkerProvider = async (
  data: ComlinkWorkerResolveData
) => {
  // call Comlink "onDestroy"
  await data.proxyWorker[releaseProxy]();
  // destroy worker
  data.rawWorker.terminate();
};

export const getWorkerFromRouterData = () =>
  (inject(ActivatedRoute).snapshot.data['worker'] as ComlinkWorkerResolveData)
    .proxyWorker;
