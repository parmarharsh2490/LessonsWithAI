import {
  createInterceptorCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  IncludeBearerTokenCondition,
  provideKeycloak,
} from 'keycloak-angular';
import { environment } from '../../environment/environment';

const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^(.*)$/i, // matches all URLs
  bearerPrefix: 'Bearer',
});

export const keyCloackProviders = () => {
  // Only provide Keycloak configuration in browser environment
  if (typeof window === 'undefined') {
    return [];
  }
  return [
    provideKeycloak({
      config: {
        url: environment.keyCloakUrl,
        realm: environment.keyCloakRealm,
        clientId: environment.keyCloakClientId,
      },
      initOptions: {
        onLoad: 'login-required',
        locale: 'en',
        enableLogging: true,
        checkLoginIframe: false,
      },
    }),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [urlCondition],
    },
  ];
};
