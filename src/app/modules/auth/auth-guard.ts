import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { UserProfileService } from '../user/service/user-profile.service';
import { CommonService } from '../../services/common-service';
import { HttpErrorResponse } from '@angular/common/http';

export const authGuard: CanActivateFn = () => {
  const commonService = inject(CommonService);
  if (!commonService.isBrowser) return true;
  const userProfileService = inject(UserProfileService);
  console.log('User Profile Service');
  return userProfileService.getUser().pipe(
    map(() => {
      return true;
    }),
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403) {
          window.location.href =
            'http://localhost:8081/oauth2/authorization/keycloak';
        }
      }
      return of(false);
    }),
  );
};
