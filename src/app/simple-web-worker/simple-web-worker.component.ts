import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-simple-web-worker',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './simple-web-worker.component.html',
})
export class SimpleWebWorkerComponent implements OnInit {
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
