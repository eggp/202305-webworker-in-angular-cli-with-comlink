import { proxy, releaseProxy, Remote, RemoteObject, wrap } from 'comlink';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { type ExcelWorker } from '../worker/excel.worker';

export interface ExcelWorkerResolveData {
  rawWorker: Worker;
  proxyWorker: Remote<ExcelWorker>;
}

export const excelWorkerProvider = (): Promise<ExcelWorkerResolveData> => {
  // create native worker
  const rawWorker = new Worker(
    new URL('./../worker/excel.worker', import.meta.url)
  );
  const workerProxy = wrap<ExcelWorker>(rawWorker);
  const workerProxyCreateInstancePromise =
    // @ts-ignore
    new workerProxy(
      // fill constructor params
      'paramString',
      proxy((param: string) => console.log('inited paramFn: ', param))
    ) as Promise<Remote<ExcelWorker>>;

  return workerProxyCreateInstancePromise.then((proxyWorker) => ({
    rawWorker,
    proxyWorker,
  }));
};

export const destroyExcelWorkerProvider = async (
  data: ExcelWorkerResolveData
) => {
  // call Comlink "onDestroy"
  await data.proxyWorker[releaseProxy]();
  // destroy worker
  data.rawWorker.terminate();
};

export const getWorkerFromRouterData = () =>
  (inject(ActivatedRoute).snapshot.data['worker'] as ExcelWorkerResolveData)
    .proxyWorker;
