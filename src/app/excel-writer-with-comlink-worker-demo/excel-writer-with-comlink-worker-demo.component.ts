import { Component, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { faker } from '@faker-js/faker';
import { utils, write } from 'xlsx';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { getWorkerFromRouterData } from './provider/worker.provider';

@Component({
  selector: 'app-excel-writer-with-comlink-worker-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './excel-writer-with-comlink-worker-demo.component.html',
  styleUrls: ['./excel-writer-with-comlink-worker-demo.component.scss'],
})
export default class ExcelWriterWithComlinkWorkerDemoComponent {
  readonly form = new FormGroup({
    msg: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  readonly rowsCountControl = new FormControl(1000000, { nonNullable: true });
  #worker = getWorkerFromRouterData();
  #ngZone = inject(NgZone);
  generatedExcelFile: ArrayBuffer | null = null;
  loading = false;

  runInAngularContext(logContext = 'runInAngularContext') {
    this.loading = true;
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
    this.generatedExcelFile = write(wb, {
      type: 'buffer',
      compression: true,
    }) as ArrayBuffer;
    console.log(
      `[${logContext}]`,
      'ArrayBuffer result:',
      this.generatedExcelFile
    );
    console.log(
      `[${logContext}]`,
      `ArrayBuffer size in mb ~ ${this.bytesToSize(
        this.generatedExcelFile.byteLength
      )}`
    );
    this.loading = false;
  }

  runInJSContext() {
    this.#ngZone.runOutsideAngular(() =>
      this.runInAngularContext('runInJSContext')
    );
  }

  runInWorkerContext() {
    console.log('call runInWorkerContext');
    this.loading = true;
    this.#worker
      .generateDatas(this.rowsCountControl.value)
      .then((result: ArrayBuffer) => {
        console.log('[runInWorkerContext]', 'ArrayBuffer result:', result);
        console.log(
          '[runInWorkerContext]',
          `ArrayBuffer size in mb ~ ${this.bytesToSize(result.byteLength)}`
        );
        this.generatedExcelFile = result;
        this.loading = false;
      });
  }

  onClickDownloadFile() {
    const file = new Blob([this.generatedExcelFile!], {
      type: 'application/vnd.ms-excel;charset=utf-8',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'generated.xlsx';
    document.body.appendChild(a);
    a.click();
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
