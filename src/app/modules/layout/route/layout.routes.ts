import { Routes } from '@angular/router';
import { assistantRoutes } from '../../assistant/assistant.routes';
import { userRoutes } from '../../user/user.routes';
import { callRoutes } from '../../call/call.routes';
import { homeRoutes } from '../../home/home.routes';
import { knowledgebaseRoutes } from '../../knowledgebase/knowledgebase-list/knowledgebase.routes';
import { Layout } from '../layout/layout';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../auth/auth-interceptor';
export const layoutRoutes: Routes = [
  {
    path: '',
    component: Layout,
    // canActivate : [AuthGuard]
    providers: [provideHttpClient(withInterceptors([authInterceptor]))],
    children: [
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
    ],
  },
];
