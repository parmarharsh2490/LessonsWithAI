import { FactoryProvider, inject, Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class KeycloakDataService {
  private keycloak = inject(Keycloak);

  getUser() {
    return this.keycloak.loadUserProfile();
  }
  setUserData(user: any) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user.id,
      }),
    );
  }
}

export function myServiceFactory(): KeycloakDataService | null {
  if (typeof window !== 'undefined') {
    // your condition
    return new KeycloakDataService();
  }
  return null; // no service on SSR
}

export const KeycloakDataServiceProvider: FactoryProvider = {
  provide: KeycloakDataService,
  useFactory: myServiceFactory,
};
