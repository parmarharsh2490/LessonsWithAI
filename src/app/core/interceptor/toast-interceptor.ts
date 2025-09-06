import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CommonService } from '../../services/common-service';
import { MessageService } from '../../services/message.service';
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../response/resonse-message';
import { tap } from 'rxjs';
import { HTTP_RESPONSE_CODE } from '../response/response-code';
import { Router } from '@angular/router';

export const toastInterceptor: HttpInterceptorFn = (req, next) => {
  const commonService = inject(CommonService);
  if (!commonService.isBrowser) return next(req);
  const router = inject(Router);
  const toastService = inject(MessageService);

  return next(req).pipe(
    tap((res) => {
      if (res.type === HttpEventType.Response) {
        if (res.status === HTTP_RESPONSE_CODE.SUCCESS) {
          if (req.context.get(SUCCESS_MESSAGE)) {
            toastService.showSuccessToast(req.context.get(SUCCESS_MESSAGE));
          }
        }
        if (res.status === HTTP_RESPONSE_CODE.BAD_REQUEST) {
          if (req.context.get(ERROR_MESSAGE)) {
            toastService.showErrorToast(req.context.get(ERROR_MESSAGE));
          }
        }
        if (res.status === HTTP_RESPONSE_CODE.FORBIDDEN) {
          router.navigateByUrl('/auth/login');
        }
      }
    }),
  );
};
