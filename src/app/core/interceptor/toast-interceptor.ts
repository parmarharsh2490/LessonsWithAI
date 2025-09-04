import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CommonService } from '../../services/common-service';
import { MessageService } from '../../services/message.service';
import {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  INFO_MESSAGE,
  WARN_MESSAGE,
} from '../response/resonse-message';

export const toastInterceptor: HttpInterceptorFn = (req, next) => {
  const commonService = inject(CommonService);
  if (!commonService.isBrowser) return next(req);

  const toastService = inject(MessageService);
  if (req.context.get(SUCCESS_MESSAGE)) {
    toastService.showSuccessToast(req.context.get(SUCCESS_MESSAGE));
  }
  if (req.context.get(ERROR_MESSAGE)) {
    toastService.showErrorToast(req.context.get(ERROR_MESSAGE));
  }
  if (req.context.get(INFO_MESSAGE)) {
    toastService.showInfoToast(req.context.get(INFO_MESSAGE));
  }
  if (req.context.get(WARN_MESSAGE)) {
    toastService.showWarnToast(req.context.get(WARN_MESSAGE));
  }
  return next(req);
};
