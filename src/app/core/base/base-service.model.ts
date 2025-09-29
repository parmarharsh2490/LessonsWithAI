import { Observable } from 'rxjs';
import { IResponseData } from '../response/response-data';

export interface IBaseService<T> {
  getModuleName(): string;

  getById(id: string): Observable<IResponseData<T>>;

  update(data: T): Observable<IResponseData<T>>;

  save(data: T): Observable<IResponseData<T>>;

  getAll(): Observable<IResponseData<T>>;

  delete(id: string): Observable<IResponseData<T>>;
}
