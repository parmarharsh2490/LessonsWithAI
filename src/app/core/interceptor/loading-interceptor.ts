import { HttpInterceptorFn } from '@angular/common/http';
import { CommonService } from '../../services/common-service';
import { inject } from '@angular/core';
import { SKIP_LOADING_TOKEN } from './http-context';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const commonService = inject(CommonService);
  const loadingService = inject(LoadingService);
  if (!commonService.isBrowser) return next(req);

  if (req.context.get(SKIP_LOADING_TOKEN)) {
    return next(req);
  }

  loadingService.show();

  return next(req).pipe(finalize(() => loadingService.hide()));
};
