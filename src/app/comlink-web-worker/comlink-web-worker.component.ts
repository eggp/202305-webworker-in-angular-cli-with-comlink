import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { proxy } from 'comlink';
import { WorkerDto } from './worker/type/worker.dto';

@Component({
  selector: 'app-comlink-web-worker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './comlink-web-worker.component.html',
})
export class ComlinkWebWorkerComponent {
  #worker = inject(ActivatedRoute).snapshot.data['worker'].proxyWorker;
  form = new FormGroup({
    msg: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

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
}
