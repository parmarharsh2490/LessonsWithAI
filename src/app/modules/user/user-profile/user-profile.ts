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
import { CommonService } from '../../../services/common-service';
@Component({
  selector: 'app-user-profile',
  imports: [Button, Card, ReactiveFormsModule, Input],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile implements OnInit {
  formData = signal<FormGroup>(
    new FormGroup({
      id: new FormControl(''),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    }),
  );
  constructor(
    private userProfileService: UserProfileService,
    private messageService: MessageService,
    private seoService: SEOService,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.formData().get('email')?.disable();
    // Set SEO meta tags for user profile page
    this.seoService.updateSEO(this.seoService.getProfileSEO());
    if (!this.commonService.isBrowser) return;
    this.setUserData();
  }

  setUserData() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.formData().patchValue({
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
    });
  }
  onSubmit() {
    this.formData().get('email')?.enable();
    this.formData().markAllAsTouched();
    this.userProfileService.save(this.formData().value).subscribe(
      (res) => {
        if (res.responseCode === 200) {
          this.messageService.showSuccessToast('Profile updated successfully');
        }
      },
      (err) => {
        this.messageService.showErrorToast(err.error.message);
      },
      () => {
        this.formData().get('email')?.disable();
      },
    );
  }
}
