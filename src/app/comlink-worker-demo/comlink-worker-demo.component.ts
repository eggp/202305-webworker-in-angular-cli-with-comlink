import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { proxy } from 'comlink';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { WorkerDto } from './worker/type/worker.dto';
import { getWorkerFromRouterData } from './provider/worker.provider';

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
  #worker = getWorkerFromRouterData();

  onSubmitSetParamString() {
    if (this.form.valid) {
      (this.#worker as any).paramString = this.form.value.msg!;
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
}
