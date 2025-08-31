import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./user-profile/user-profile').then((m) => m.UserProfile),
  },
];
