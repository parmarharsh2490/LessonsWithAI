import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CommonService } from '../../services/common-service';
import { MessageService } from '../../services/message.service';
import { tap } from 'rxjs';
import { HTTP_RESPONSE_CODE } from '../response/response-code';
import { Router } from '@angular/router';
import {
  SUCCESS_MESSAGE_TOAST,
  ERROR_MESSAGE_TOAST,
  INFO_MESSAGE_TOAST,
  WARN_MESSAGE_TOAST,
} from '../response/resonse-message';

export const toastInterceptor: HttpInterceptorFn = (req, next) => {
  const commonService = inject(CommonService);
  if (!commonService.isBrowser) return next(req);
  const router = inject(Router);
  const toastService = inject(MessageService);

  return next(req).pipe(
    tap((res) => {
      if (res.type === HttpEventType.Response) {
        if (
          res.status === HTTP_RESPONSE_CODE.OK ||
          res.status === HTTP_RESPONSE_CODE.CREATED ||
          res.status === HTTP_RESPONSE_CODE.NO_CONTENT
        ) {
          if (req.context.get(SUCCESS_MESSAGE_TOAST)) {
            toastService.showSuccessToast(
              req.context.get(SUCCESS_MESSAGE_TOAST),
            );
          }
        }
        if (
          res.status === HTTP_RESPONSE_CODE.BAD_REQUEST ||
          res.status === HTTP_RESPONSE_CODE.UNAUTHORIZED ||
          res.status === HTTP_RESPONSE_CODE.FORBIDDEN ||
          res.status === HTTP_RESPONSE_CODE.NOT_FOUND ||
          res.status === HTTP_RESPONSE_CODE.INTERNAL_SERVER_ERROR
        ) {
          if (req.context.get(ERROR_MESSAGE_TOAST)) {
            toastService.showErrorToast(req.context.get(ERROR_MESSAGE_TOAST));
          }
          if (req.context.get(INFO_MESSAGE_TOAST)) {
            toastService.showInfoToast(req.context.get(INFO_MESSAGE_TOAST));
          }
          if (req.context.get(WARN_MESSAGE_TOAST)) {
            toastService.showWarnToast(req.context.get(WARN_MESSAGE_TOAST));
          }
        }
        if (res.status === HTTP_RESPONSE_CODE.FORBIDDEN) {
          router.navigateByUrl('/auth/login');
        }
      }
    }),
  );
};
