import { Component, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { proxy, RemoteObject, wrap } from 'comlink';
import { WorkerDto } from './worker/type/worker.dto';
import { utils, write } from 'xlsx';
import { faker } from '@faker-js/faker';
import { type ExcelWorker } from './worker/excel.worker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-comlink-web-worker',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSliderModule,
  ],
  templateUrl: './comlink-worker-demo.component.html',
  styleUrls: ['./comlink-worker-demo.component.scss'],
})
export default class ComlinkWorkerDemoComponent {
  readonly form = new FormGroup({
    msg: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  readonly rowsCountControl = new FormControl(1000000, { nonNullable: true });
  #worker = inject(ActivatedRoute).snapshot.data['worker'].proxyWorker;
  #excelWorker!: RemoteObject<ExcelWorker>;
  #ngZone = inject(NgZone);

  constructor() {
    // create native worker
    const rawWorker = new Worker(
      new URL('./worker/excel.worker', import.meta.url)
    );
    // create proxy generator
    const workerProxy = wrap<ExcelWorker>(rawWorker);
    // @ts-ignore
    new workerProxy().then((proxyWorker) => (this.#excelWorker = proxyWorker));
  }

  onSubmitSetParamString() {
    if (this.form.valid) {
      this.#worker.paramString = this.form.value.msg!;
    }
  }

  onWorkerCallParamFn() {
    this.#worker.callParamFn();
  }

  onWorkerCallWithCallback() {
    this.#worker.withCallback(
      proxy((param: number) => {
        console.log(
          '[ComlinkWebWorkerComponent]',
          'withCallback call: ',
          param
        );
      })
    );
  }

  onWorkerCallParamComplexObject() {
    const dto: WorkerDto = {
      param1: 'param1',
      children: [
        {
          param1: 'param2',
          children: [
            {
              param1: 'param3',
              children: [],
            },
          ],
        },
      ],
    };
    this.#worker.paramComplexObject(dto);
  }

  runInAngularContext(logContext = 'runInAngularContext') {
    const rowCount = this.rowsCountControl.value;
    const data = [];
    for (let i = 0; i < rowCount; i++) {
      data.push({
        userId: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
      });
    }

    /* generate worksheet */
    const ws = utils.json_to_sheet(data);

    /* generate workbook and add the worksheet */
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    const result = write(wb, {
      type: 'buffer',
      compression: true,
    }) as ArrayBuffer;
    console.log(`[${logContext}]`, 'ArrayBuffer result:', result);
    console.log(
      `[${logContext}]`,
      `ArrayBuffer size in mb ~ ${this.bytesToSize(result.byteLength)}`
    );
  }

  runInJSContext() {
    this.#ngZone.runOutsideAngular(() =>
      this.runInAngularContext('runInJSContext')
    );
  }

  runInWorkerContext() {
    console.log('call runInWorkerContext');
    this.#excelWorker
      .generateDatas(this.rowsCountControl.value)
      .then((result: ArrayBuffer) => {
        console.log('[runInWorkerContext]', 'ArrayBuffer result:', result);
        console.log(
          '[runInWorkerContext]',
          `ArrayBuffer size in mb ~ ${this.bytesToSize(result.byteLength)}`
        );
      });
  }

  private bytesToSize(bytes: number) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) {
      return 'n/a';
    }
    let i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`);
    if (i == 0) {
      return bytes + ' ' + sizes[i];
    }
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  }
}
