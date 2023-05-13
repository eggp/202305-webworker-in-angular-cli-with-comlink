import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  ],
  templateUrl: './native-worker-demo.component.html',
  styleUrls: ['./native-worker-demo.component.scss'],
})
export class NativeWorkerDemoComponent implements OnInit {
  #worker = inject(ActivatedRoute).snapshot.data['worker'] as Worker;
  form = new FormGroup({
    msg: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  ngOnInit() {
    this.#worker.onmessage = ({ data }) =>
      console.log('[SimpleWebWorkerComponent]', `got message: ${data}`);
  }

  sendTestMessage(msg: string) {
    this.#worker.postMessage(msg);
  }

  onSubmit() {
    if (this.form.valid) {
      this.sendTestMessage(this.form.value.msg!);
    }
  }
}
