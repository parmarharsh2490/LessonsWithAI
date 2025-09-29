import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { IBaseService } from './base-service.model';
import { Observable } from 'rxjs';
import { IResponseData } from '../response/response-data';
import { environment } from '../../../environment/environment';

export class BaseService<T> implements IBaseService<T> {
  private http = inject(HttpClient);

  getModuleName(): string {
    return '';
  }

  getById(id: string): Observable<IResponseData<T>> {
    return this.http.get<IResponseData<T>>(
      environment.baseUrl + this.getModuleName() + '/' + id,
    );
  }

  getAll(): Observable<IResponseData<T>> {
    return this.http.get<IResponseData<T>>(
      environment.baseUrl + this.getModuleName() + '/all',
    );
  }

  update(data: T): Observable<IResponseData<T>> {
    return this.http.put<IResponseData<T>>(
      environment.baseUrl + this.getModuleName() + '/update',
      data,
    );
  }

  save(data: T): Observable<IResponseData<T>> {
    return this.http.post<IResponseData<T>>(
      environment.baseUrl + this.getModuleName() + '/save',
      data,
    );
  }

  delete(id: string): Observable<IResponseData<T>> {
    return this.http.delete<IResponseData<T>>(
      environment.baseUrl + this.getModuleName() + '/' + id,
    );
  }
}
