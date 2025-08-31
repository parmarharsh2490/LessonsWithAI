import { Routes } from '@angular/router';
import { assistantRoutes } from './modules/assistant/assistant.routes';
import { authRoutes } from './modules/auth/auth.route';
import { userRoutes } from './modules/user/user.routes';
import { callRoutes } from './modules/call/call.routes';
import { homeRoutes } from './modules/home/home.routes';
import { knowledgebaseRoutes } from './modules/knowledgebase/knowledgebase-list/knowledgebase.routes';
export const routes: Routes = [
  {
    path: '',
    children: homeRoutes,
  },
  {
    path: 'assistants',
    children: assistantRoutes,
  },
  {
    path: 'profile',
    children: userRoutes,
  },
  {
    path: 'call-history',
    children: callRoutes,
  },
  {
    path: 'knowledge-base',
    children: knowledgebaseRoutes,
  },
  {
    path: 'auth',
    children: authRoutes,
    loadComponent: () =>
      import('./modules/auth/auth-layout/auth-layout').then(
        (m) => m.AuthLayout,
      ),
  },
];
