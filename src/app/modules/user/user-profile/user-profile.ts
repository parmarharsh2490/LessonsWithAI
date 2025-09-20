import { Component, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { UserProfileService } from '../service/user-profile.service';
import { MessageService } from '../../../services/message.service';
import { Input } from '../../../components/ui/input/input';
import { SEOService } from '../../../services/seo.service';
@Component({
  selector: 'app-user-profile',
  imports: [Button, Card, ReactiveFormsModule, Input],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile implements OnInit {
  formData = signal<FormGroup>(
    new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    }),
  );
  constructor(
    private userProfileService: UserProfileService,
    private messageService: MessageService,
    private seoService: SEOService,
  ) {}

  ngOnInit(): void {
    // Set SEO meta tags for user profile page
    this.seoService.updateSEO(this.seoService.getProfileSEO());
  }
  onSubmit() {
    this.formData().markAllAsTouched();
    this.userProfileService.saveUserProfile(this.formData().value).subscribe(
      (res) => {
        if (res.statusCode === 200) {
          this.messageService.showSuccessToast('Profile updated successfully');
          this.formData().reset();
        }
      },
      (err) => {
        this.messageService.showErrorToast(err.error.message);
      },
    );
  }
}
