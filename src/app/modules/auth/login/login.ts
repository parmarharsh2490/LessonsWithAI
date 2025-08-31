import { Component, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Input } from '../../../components/ui/input/input';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ButtonModule, Input],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  formData = signal<FormGroup>(
    new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    }),
  );
  login() {
    console.log(this.formData().value);
  }
}
