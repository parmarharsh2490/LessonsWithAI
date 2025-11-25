import { HttpClient, HttpContext } from '@angular/common/http';
import { inject } from '@angular/core';
import { IBaseService } from './base-service.model';
import { Observable } from 'rxjs';
import { IResponseData } from '../response/response-data';
import { environment } from '../../../environment/environment';
import {
  MODULE_ID_TOKEN,
  MODULE_NAME,
  MODULE_NAME_TOKEN,
} from '../interceptor/http-context';
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
}
