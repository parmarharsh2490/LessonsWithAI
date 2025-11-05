import {
  HttpEventType,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { MODULE_NAME_TOKEN, SKIP_CACHING_TOKEN } from './http-context';
import { CachingService } from '../services/caching.service';
import { inject } from '@angular/core';
import { CachingKey } from '../constants/caching.constants';
import { of, tap } from 'rxjs';

export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(CachingService);

  let skipCaching = req.context.get(SKIP_CACHING_TOKEN);
  let moduleName = req.context.get(MODULE_NAME_TOKEN) as CachingKey;

  if (!skipCaching && moduleName) {
    if (cacheService.get(moduleName)) {
      return of(
        new HttpResponse({
          status: 200,
          body: cacheService.get(moduleName)?.data,
        }),
      );
    } else {
      return next(req).pipe(
        tap((res) => {
          if (res.type === HttpEventType.Response) {
            cacheService.set(moduleName, res.body);
          }
        }),
      );
    }
  }

  return next(req);
};
