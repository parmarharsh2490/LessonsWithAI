import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./homepage/homepage').then((m) => m.Homepage),
  },
];
