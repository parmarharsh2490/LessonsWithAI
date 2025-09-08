import { Component, signal, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { Input } from '../../../components/ui/input/input';
import { SEOService } from '../../../services/seo.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Button, Input],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  formData = signal<FormGroup>(
    new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    }),
  );

  constructor(private seoService: SEOService) {}

  ngOnInit(): void {
    // Set SEO meta tags for login page
    this.seoService.updateSEO(this.seoService.getLoginSEO());
  }

  login() {}
}
