import {
  HttpEventType,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import {
  MODULE_ID_TOKEN,
  MODULE_NAME_TOKEN,
  SKIP_CACHING_TOKEN,
} from './http-context';
import { CachingService } from '../services/caching.service';
import { inject } from '@angular/core';
import { CachingKey } from '../constants/caching.constants';
import { of, tap } from 'rxjs';

export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(CachingService);

  let skipCaching = req.context.get(SKIP_CACHING_TOKEN);
  let moduleName = req.context.get(MODULE_NAME_TOKEN) as CachingKey;
  let idToken = req.context.get(MODULE_ID_TOKEN) as string;

  if (skipCaching || !moduleName) {
    return next(req);
  }

  if (req.method === 'GET') {
    const responseBody = idToken
      ? cacheService.get(moduleName + '/' + idToken)?.data
      : cacheService.get(moduleName)?.data;
    if (responseBody) {
      return of(
        new HttpResponse({
          status: 200,
          body: responseBody,
        }),
      );
    }
  }

  return next(req).pipe(
    tap((res) => {
      if (res.type === HttpEventType.Response) {
        if (req.method === 'GET') {
          if (idToken) {
            cacheService.set(moduleName + '/' + idToken, res.body);
          } else {
            cacheService.set(moduleName, res.body);
          }
        }
        if (['DELETE', 'PUT', 'POST'].includes(req.method)) {
          if (cacheService.get(moduleName)) {
            cacheService.invalidate(moduleName);
          }
          if (
            moduleName &&
            idToken &&
            cacheService.get(moduleName + '/' + idToken)
          ) {
            cacheService.invalidate(moduleName + '/' + idToken);
          }
        }
      }
    }),
  );
};
