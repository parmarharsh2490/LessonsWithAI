import { Routes } from '@angular/router';
import { Homepage } from './modules/home/homepage/homepage';
import { UserProfile } from './modules/user/user-profile/user-profile';
import { AssistantLists } from './modules/assistant/assistant-lists/assistant-lists';
import { CallHistoryLists } from './modules/call/call-history-lists/call-history-lists';
import { KnowledgebaseList } from './modules/knowledgebase/knowledgebase-list/knowledgebase-list';
import { Login } from './modules/auth/login/login';
import { Register } from './modules/auth/register/register';
import { AuthLayout } from './modules/auth/auth-layout/auth-layout';
export const routes: Routes = [
  {
    path: '',
    component: Homepage,
  },
  {
    path: 'assistants',
    component: AssistantLists,
  },
  {
    path: 'profile',
    component: UserProfile,
  },
  {
    path: 'call-history',
    component: CallHistoryLists,
  },
  {
    path: 'knowledge-base',
    component: KnowledgebaseList,
  },
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
    ],
  },
];
