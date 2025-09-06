import { Component, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { Input } from '../../../components/ui/input/input';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, Button, Input],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  formData = signal<FormGroup>(
    new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    }),
  );
  register() {}
}
