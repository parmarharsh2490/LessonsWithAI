import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { UserProfileService } from '../service/user-profile.service';
import { MessageService } from '../../../services/message.service';
@Component({
  selector: 'app-user-profile',
  imports: [
    Button,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile implements OnInit {
  formData: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private userProfileService: UserProfileService,
    private messageService: MessageService,
  ) {}
  ngOnInit(): void {}
  onSubmit() {
    this.formData.markAllAsTouched();
    this.userProfileService.saveUserProfile(this.formData.value).subscribe(
      (res) => {
        if (res.status === 200) {
          this.messageService.showSuccessToast('Profile updated successfully');
          this.formData.reset();
        }
      },
      (err) => {
        this.messageService.showErrorToast(err.error.message);
      },
    );
  }
}
