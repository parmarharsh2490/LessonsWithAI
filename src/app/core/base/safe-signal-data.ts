import {
  ToSignalOptions,
  toSignal as toSignalRxjs,
} from '@angular/core/rxjs-interop';
import { catchError, concat, map, Observable, of, shareReplay } from 'rxjs';
import { IResponseData } from '../response/response-data';
import {
  CreateSignalOptions,
  effect,
  signal,
  ValueEqualityFn,
} from '@angular/core';

export const toSignal = <T>(observable: Observable<IResponseData<T>>) => {
  const Signal = toWritableSignal(
    observable.pipe(
      map((data) => data.data),
      shareReplay(1),
      catchError(() => of(null as T)),
    ),
    {
      initialValue: [],
    },
  );
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
