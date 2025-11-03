import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { UserProfileService } from '../service/user-profile.service';
import { Input } from '../../../components/ui/input/input';
import { SEOService } from '../../../services/seo.service';
import { CommonService } from '../../../services/common-service';
// import { KeycloakDataService } from '../../../utils/keycloak-data.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  imports: [Button, Card, ReactiveFormsModule, Input],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile implements OnInit {
  // private keycloakDataService = inject(KeycloakDataService);
  private service = inject(UserProfileService);
  private seoService = inject(SEOService);
  private commonService = inject(CommonService);

  isLoading = signal<boolean>(false);

  formData = signal<FormGroup>(
    new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    }),
  );

  ngOnInit(): void {
    this.formData().get('email')?.disable();
    // Set SEO meta tags for user profile page
    this.seoService.updateSEO(this.seoService.getProfileSEO());
    if (!this.commonService.isBrowser) return;
    // this.setData();
  }

  setData() {
    // this.keycloakDataService.getUserData().then((userData) => {
    //   this.formData().patchValue({
    //     firstName: userData.firstName,
    //     lastName: userData.lastName,
    //     email: userData.email,
    //     id: userData.id,
    //   });
    // });
  }
  onSubmit() {
    this.isLoading.set(true);
    firstValueFrom(this.service.update(this.formData().getRawValue())).then(
      () => {
        this.isLoading.set(false);
      },
    );
  }
}
