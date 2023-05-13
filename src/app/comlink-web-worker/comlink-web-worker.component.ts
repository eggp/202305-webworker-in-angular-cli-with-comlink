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
import { read, utils, write } from 'xlsx';
import { faker } from '@faker-js/faker';
import { type ExcelWorker } from './worker/excel.worker';

@Component({
  selector: 'app-comlink-web-worker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './comlink-web-worker.component.html',
})
export class ComlinkWebWorkerComponent {
  form = new FormGroup({
    msg: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  uploadForm = new FormGroup({
    file: new FormControl<File | null>(null, Validators.required),
  });
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

  onCallParamFn() {
    this.#worker.callParamFn();
  }

  onCallWithCallback() {
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

  onCallParamComplexObject() {
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

  onSubmitUploadForm() {
    if (this.uploadForm.valid) {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        // const workBook = read(this.uploadForm.value.file!,{type:'file'});
        const workBook = read(e.target.result, { type: 'binary' });
        const firstSheet = workBook.Sheets[workBook.SheetNames[0]];
        console.log(utils.sheet_to_json(firstSheet).length);
      };
      fileReader.readAsBinaryString(this.uploadForm.value.file!);
    }
  }

  onChangeFileInput(e: Event) {
    this.uploadForm.patchValue({
      file: (e.target as HTMLInputElement).files![0],
    });
  }

  xxxxxx() {
    const rowCount = 1000000;
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
    const base64 = write(wb, { type: 'base64' });
    console.log('base64: ', base64);
  }

  withoutZone() {
    this.#ngZone.runOutsideAngular(() => this.xxxxxx());
  }

  excelInWorker() {
    console.log('call excelInWorker');
    this.#excelWorker.generateDatas().then((result: string) => {
      console.log('buffer result', result);
    });
  }
}
