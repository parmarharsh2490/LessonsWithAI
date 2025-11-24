import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  inject,
  Injectable,
} from '@angular/core';

@Injectable()
export class LazyLoadComponentService<T> {
  injector = inject(EnvironmentInjector);
  applicationRef = inject(ApplicationRef);
  componentRef: ComponentRef<T> | null = null;
}
