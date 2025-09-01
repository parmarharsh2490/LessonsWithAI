import { Routes } from '@angular/router';
import { authRoutes } from './modules/auth/auth.route';
import { layoutRoutes } from './modules/layout/route/layout.routes';

export const routes: Routes = [
  {
    path: '',
    children: layoutRoutes,
  },
  {
    path: 'auth',
    children: authRoutes,
    loadComponent: () =>
      import('./modules/auth/auth-layout/auth-layout').then(
        (m) => m.AuthLayout,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found').then((m) => m.NotFound),
  },
];
