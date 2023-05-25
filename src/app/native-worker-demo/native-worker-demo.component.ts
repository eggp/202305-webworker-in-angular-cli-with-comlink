import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { getWorkerFromRouterData } from './provider/worker.provider';

@Component({
  selector: 'app-simple-web-worker',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
  ],
  templateUrl: './native-worker-demo.component.html',
  styleUrls: ['./native-worker-demo.component.scss'],
})
export default class NativeWorkerDemoComponent implements OnInit {
  readonly form = new FormGroup({
    msg: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  readonly messages$ = new BehaviorSubject<
    {
      to: { msg: string; create: string };
      reply?: { msg: string; create: string };
    }[]
  >([]);
  #worker = getWorkerFromRouterData();

  ngOnInit() {
    this.#worker.onmessage = ({ data }) => {
      // console.log('[SimpleWebWorkerComponent]', `got message: ${data}`);
      const messages = this.messages$.getValue();
      messages[messages.length - 1].reply = {
        msg: data,
        create: this.nowString(),
      };
      this.messages$.next([...messages]);
      this.form.enable();
      this.form.reset();
    };
  }

  sendTestMessage(msg: string) {
    this.#worker.postMessage(msg);
  }

  onSubmit() {
    if (this.form.valid) {
      const msg = this.form.value.msg!;
      this.form.disable();
      this.messages$.next(
        this.messages$
          .getValue()
          .concat({ to: { msg, create: this.nowString() } })
      );
      this.sendTestMessage(msg);
    }
  }

  private nowString() {
    return new Date().toString();
  }
}
