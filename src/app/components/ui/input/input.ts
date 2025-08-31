import { Component, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-input',
  imports: [InputTextModule, ReactiveFormsModule, MessageModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {
  formData = input.required<FormGroup>();
  label = input.required<string>();
  type = input.required<string>();
  placeholder = input.required<string>();
  key = input.required<string>();
}
