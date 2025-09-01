import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-input',
  imports: [InputText, ReactiveFormsModule, Message],
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
