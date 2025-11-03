import {
  HttpErrorResponse,
  HttpEventType,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { CommonService } from '../../services/common-service';
import { catchError, of, tap, throwError } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { MODULE_NAME_TOKEN, SKIP_TOAST_TOKEN } from './http-context';
import { TitleCasePipe } from '@angular/common';

export const toastInterceptor: HttpInterceptorFn = (req, next) => {
  const commonService = inject(CommonService);
  if (!commonService.isBrowser) return next(req);
  // const router = inject(Router);
  const toastService = inject(MessageService);
  const titleCasePipe = inject(TitleCasePipe);

  return next(req).pipe(
    tap((res) => {
      if (res.type === HttpEventType.Response) {
        let moduleName = req.context.get(MODULE_NAME_TOKEN);
        moduleName = titleCasePipe.transform(moduleName);
        let skipToast = req.context.get(SKIP_TOAST_TOKEN);
        if (!moduleName || skipToast) {
          return;
        }

        if (res.status === HttpStatusCode.Created) {
          toastService.showSuccessToast(`${moduleName} Created Successfully`);
        }

        if (res.status === HttpStatusCode.NoContent) {
          toastService.showSuccessToast(`${moduleName} Deleted Successfully`);
        }

        if (req.method === 'PUT' && res.status === HttpStatusCode.Ok) {
          toastService.showSuccessToast(`${moduleName} Updated Successfully`);
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.error.responseMessage) {
        let skipToast = req.context.get(SKIP_TOAST_TOKEN);
        if (!skipToast) {
          toastService.showErrorToast(error.error.responseMessage);
        }
      }
      return throwError(() => of([]));
    }),
  );
};
