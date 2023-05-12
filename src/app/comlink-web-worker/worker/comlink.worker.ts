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

  get paramString() {
    return this._paramString;
  }

  set paramString(value: string) {
    console.log('[ComlinkWorker]', 'call setParamString: ', value);
    this._paramString = value;
  }

  get paramFn(): (param: string) => string {
    return this._paramFn;
  }

  set paramFn(value: (param: string) => string) {
    this._paramFn = value;
  }

  callParamFn() {
    this._paramFn('call');
  }

  doSomething(param: number) {
    return param * 5;
  }

  withCallback(paramFn: (param: number) => void) {
    timer(2000, 2000).subscribe(paramFn);
  }

  paramComplexObject(param: WorkerDto) {
    console.log('[WORKER]', 'paramComplexObject:', param);
  }
}

// Required!
expose(ComlinkWorker);
