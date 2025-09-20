import { Routes } from '@angular/router';
import { authRoutes } from './modules/auth/auth.route';
import { layoutRoutes } from './modules/layout/route/layout.routes';
import { authGuard } from './modules/auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    children: layoutRoutes,
    canActivate: [authGuard],
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
