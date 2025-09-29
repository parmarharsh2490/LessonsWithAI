import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { Toast } from './core/toast/service/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MyPreset } from '../assets/theme/preset.config';
import { toastInterceptor } from './core/interceptor/toast-interceptor';
import { authInterceptor } from './modules/auth/auth-interceptor';
import { GloblaErrorHandler } from './core/error/global-error-handler';
import { includeBearerTokenInterceptor } from 'keycloak-angular';
import { keyCloackProviders } from './utils/keycloak-provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
      },
    }),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        toastInterceptor,
        authInterceptor,
        ...(typeof window !== 'undefined'
          ? [includeBearerTokenInterceptor]
          : []),
      ]),
    ),
    // Only provide Keycloak in browser environment
    ...(typeof window !== 'undefined' ? keyCloackProviders() : []),
    Toast,
    {
      provide: ErrorHandler,
      useClass: GloblaErrorHandler,
    },
    MessageService,
    ConfirmationService,
  ],
};
