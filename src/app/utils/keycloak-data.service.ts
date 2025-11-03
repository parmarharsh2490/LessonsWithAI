import { FactoryProvider, inject, Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
@Injectable({
  providedIn: 'root',
})
export class KeycloakDataService {
  private keycloak = inject(Keycloak);

  getUserData() {
    return this.keycloak.loadUserProfile();
  }

  setUserData() {
    localStorage.setItem('userId', this.keycloak.tokenParsed?.sub ?? '');
  }
}

export function myServiceFactory(): KeycloakDataService | null {
  if (typeof window !== 'undefined') {
    return new KeycloakDataService();
  }
  return null;
}

export const KeycloakDataServiceProvider: FactoryProvider = {
  provide: KeycloakDataService,
  useFactory: myServiceFactory,
};
