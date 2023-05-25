import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';

export const nativeWorkerProvider = () =>
  // create native worker
  new Worker(new URL('./../worker/simple.worker', import.meta.url));

export const destroyWorkerProvider = (
  data: { worker: Worker } // destroy worker
) => data.worker.terminate();

export const getWorkerFromRouterData = () =>
  inject(ActivatedRoute).snapshot.data['worker'] as Worker;
