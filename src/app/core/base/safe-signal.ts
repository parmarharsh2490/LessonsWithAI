import {
  ToSignalOptions,
  toSignal as toSignalRxjs,
} from '@angular/core/rxjs-interop';
import { catchError, concat, map, Observable, of, shareReplay } from 'rxjs';
import { IResponseData } from '../response/response-data';
import {
  CreateSignalOptions,
  effect,
  inject,
  ValueEqualityFn,
} from '@angular/core';
import { signal } from '@angular/core';
import { CommonService } from '../../services/common-service';
export const toSignal = <T>(observable: Observable<IResponseData<T>>) => {
  const commonService = inject(CommonService);
  if (!commonService.isBrowser) return signal([]);
  const Signal = toWritableSignal(
    observable.pipe(
      map((data) => data.dataList),
      shareReplay(1),
      catchError(() => of([])),
    ),
    {
      initialValue: [],
    },
  );
  // const refresh = async () => {
  //     Signal.set(await firstValueFrom(observable.pipe(map((data) => data.dataList))))
  // }
  // return {
  //     Signal : Signal,
  //     refresh
  // };
  return Signal;
};

export function toWritableSignal<T>(
  source: Observable<T>,
  { initialValue, equal, ...options }: ToWritableSignalOptions<T>,
) {
  const writableSignal = signal(initialValue as T, {
    equal: equal as ValueEqualityFn<T>,
  });

  const readonlySignal = toSignalRxjs<T>(
    concat(of(initialValue as T), source),
    {
      ...options,
      requireSync: true,
    },
  );

  effect(() => {
    writableSignal.set(readonlySignal()!);
  });

  return writableSignal;
}

export type ToWritableSignalOptions<T> = Omit<
  RequireKeys<ToSignalOptions<T>, 'initialValue'> &
    Pick<CreateSignalOptions<T>, 'equal'>,
  'requireSync'
>;

type RequireKeys<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
