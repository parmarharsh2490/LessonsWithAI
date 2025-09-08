import { Component, signal, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { Input } from '../../../components/ui/input/input';
import { SEOService } from '../../../services/seo.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, Button, Input],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  formData = signal<FormGroup>(
    new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    }),
  );

  constructor(private seoService: SEOService) {}

  ngOnInit(): void {
    // Set SEO meta tags for register page
    this.seoService.updateSEO(this.seoService.getRegisterSEO());
  }

  register() {}
}
