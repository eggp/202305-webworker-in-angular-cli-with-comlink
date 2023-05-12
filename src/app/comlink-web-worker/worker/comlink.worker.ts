// Original angular generated code
// /// <reference lib="webworker" />
//
// addEventListener('message', ({ data }) => {
//   const response = `worker response to ${data}`;
//   postMessage(response);
// });
import { expose } from 'comlink';
import { timeout, timer } from 'rxjs';
import { WorkerDto } from './type/worker.dto';

export class ComlinkWorker {
  constructor(
    private _paramString: string,
    private _paramFn: (param: string) => string
  ) {}

  get paramString(): string {
    return this._paramString;
  }

  set paramString(value: string) {
    this._paramString = value;
  }

  get paramFn(): (param: string) => string {
    return this._paramFn;
  }

  set paramFn(value: (param: string) => string) {
    this._paramFn = value;
  }

  doSomething(param: number) {
    return param * 5;
  }

  withCallback(paramFn: (param: number) => void) {
    timer(5000, 5000).subscribe(paramFn);
  }

  paramComplexObject(param: WorkerDto) {
    console.log('[WORKER]', 'paramComplexObject:', param);
  }
}

// Required!
expose(ComlinkWorker);
