import { Routes } from '@angular/router';
import { assistantRoutes } from '../../assistant/assistant.routes';
import { userRoutes } from '../../user/user.routes';
import { callRoutes } from '../../call/call.routes';
import { homeRoutes } from '../../home/home.routes';
import { knowledgebaseRoutes } from '../../knowledgebase/knowledgebase-list/knowledgebase.routes';
import { Layout } from '../layout/layout';
export const layoutRoutes: Routes = [
  {
    path: '',
    component: Layout,
    // canActivate : [AuthGuard]
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
