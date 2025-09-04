import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CommonService } from '../../services/common-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const commonService = inject(CommonService);
  if (!commonService.isBrowser) return next(req);
  const jwtToken = localStorage.getItem('jwtToken');
  // const router = inject(Router);
  if (jwtToken) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${jwtToken}`),
    });
  } else {
    // router.navigateByUrl('/auth/login');
  }
  return next(req);
};
