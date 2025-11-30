import { Observable, map, catchError, of } from 'rxjs';
import { IResponseData } from '../response/response-data';

export const toDataList = <T>(observable: Observable<IResponseData<T>>) => {
  return observable.pipe(
    map((data: IResponseData<T>) => data.dataList),
    catchError(() => of([] as T[])),
  );
};

export const toData = <T>(observable: Observable<IResponseData<T>>) => {
  return observable.pipe(
    map((data: IResponseData<T>) => data.data),
    catchError(() => of(null as T)),
  );
};
