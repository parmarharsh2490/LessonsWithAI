import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { IBaseService } from './base-service.model';
import { Observable, tap } from 'rxjs';
import { IResponseData } from '../response/response-data';
import { environment } from '../../../environment/environment';
import { MODULE_NAME } from '../interceptor/http-context';
import { CachingService } from '../services/caching.service';

export class BaseService<T> implements IBaseService<T> {
  public http = inject(HttpClient);
  public cacheService = inject(CachingService);
  getModuleName(): string {
    return '';
  }

  getById(id: string): Observable<IResponseData<T>> {
    return this.http.get<IResponseData<T>>(
      environment.baseUrl + this.getModuleName() + '/' + id,
      {
        context: MODULE_NAME(this.getModuleName() + '/' + id.toString()),
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
        context: MODULE_NAME(this.getModuleName()),
      },
    );
  }

  save(data: T): Observable<IResponseData<T>> {
    return this.http
      .post<IResponseData<T>>(
        environment.baseUrl + this.getModuleName() + '/save',
        data,
        {
          context: MODULE_NAME(this.getModuleName()),
        },
      )
      .pipe(
        tap((res: IResponseData<T>) => {
          this.cacheService.invalidate(this.getModuleName());
          const id = (res.data as any)?.id;
          if (id) {
            this.cacheService.invalidate(this.getModuleName() + '/' + id);
          }
        }),
      );
  }

  delete(id: string, secondId?: string): Observable<IResponseData<T>> {
    const url = secondId
      ? `${environment.baseUrl}${this.getModuleName()}/${id}/${secondId}`
      : `${environment.baseUrl}${this.getModuleName()}/${id}`;

    return this.http.delete<IResponseData<T>>(url, {
      context: MODULE_NAME(this.getModuleName()),
    });
  }
}
