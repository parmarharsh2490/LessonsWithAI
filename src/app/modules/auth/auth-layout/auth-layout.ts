import { Component, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [ReactiveFormsModule, ButtonModule, Card, RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout implements OnInit {
  title = signal<string>('Welcome to Learn.AI');
  ngOnInit(): void {
    if (this.router && this.router.url) {
      if (this.router.url.endsWith('login')) {
        this.title.set('Welcome Back!');
      } else if (this.router.url.endsWith('register')) {
        this.title.set('Welcome to Learn.AI');
      }
    }
  }

  constructor(private router: Router) {}
}
