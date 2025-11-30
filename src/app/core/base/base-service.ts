import { HttpClient, HttpContext } from '@angular/common/http';
import {
  inject,
  Injector,
  runInInjectionContext,
  Signal,
  signal,
} from '@angular/core';
import { IBaseService } from './base-service.model';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { IResponseData } from '../response/response-data';
import { environment } from '../../../environment/environment';
import {
  MODULE_ID_TOKEN,
  MODULE_NAME,
  MODULE_NAME_TOKEN,
} from '../interceptor/http-context';
import { CachingService } from '../services/caching.service';
import { toSignal } from '@angular/core/rxjs-interop';

export class BaseService<T> implements IBaseService<T> {
  public http = inject(HttpClient);
  public cacheService = inject(CachingService);
  private injector = inject(Injector);
  getModuleName(): string {
    return '';
  }

  getById(id: string): Observable<IResponseData<T>> {
    return this.http.get<IResponseData<T>>(
      environment.baseUrl + this.getModuleName() + '/' + id,
      {
        context: new HttpContext()
          .set(MODULE_NAME_TOKEN, this.getModuleName())
          .set(MODULE_ID_TOKEN, id.toString()),
      },
    );
  }

  getAll(): Observable<IResponseData<T>> {
    return this.http.get<IResponseData<T>>(
      environment.baseUrl + this.getModuleName(),
      {
        context: MODULE_NAME(this.getModuleName()),
      },
    );
  }

  update(data: T): Observable<IResponseData<T>> {
    return this.http.put<IResponseData<T>>(
      environment.baseUrl + this.getModuleName() + '/update',
      data,
      {
        context: new HttpContext()
          .set(MODULE_NAME_TOKEN, this.getModuleName())
          .set(MODULE_ID_TOKEN, (data as any).id.toString()),
      },
    );
  }

  save(data: T): Observable<IResponseData<T>> {
    return this.http.post<IResponseData<T>>(
      environment.baseUrl + this.getModuleName() + '/save',
      data,
      {
        context: MODULE_NAME(this.getModuleName()),
      },
    );
  }

  delete(id: string, secondId?: string): Observable<IResponseData<T>> {
    const url = secondId
      ? `${environment.baseUrl}${this.getModuleName()}/${id}/${secondId}`
      : `${environment.baseUrl}${this.getModuleName()}/${id}`;

    return this.http.delete<IResponseData<T>>(url, {
      context: new HttpContext()
        .set(MODULE_NAME_TOKEN, this.getModuleName())
        .set(MODULE_ID_TOKEN, id.toString()),
    });
  }

  getAllData(): Signal<T[]> {
    if (typeof window === 'undefined') return signal([]);
    return runInInjectionContext(this.injector, () =>
      toSignal(
        this.getAll().pipe(
          map((data) => data.dataList),
          catchError(() => of([])),
          shareReplay(1),
        ),
        {
          initialValue: [] as T[],
        },
      ),
    );
  }

  getByIdData(id: string): Signal<T | null> {
    if (typeof window === 'undefined') return signal(null as T);
    return runInInjectionContext(this.injector, () =>
      toSignal(
        this.getById(id).pipe(
          map((data) => data.data),
          catchError(() => of(null as T)),
          shareReplay(1),
        ),
        {
          initialValue: null as T,
        },
      ),
    );
  }
}
