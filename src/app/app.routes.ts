import { Routes } from '@angular/router';
import { Homepage } from './components/homepage/homepage';
import { UserProfile } from './components/user-profile/user-profile';
import { AssistantLists } from './components/assistant-lists/assistant-lists';
import { CallHistoryLists } from './components/call-history-lists/call-history-lists';
import { KnowledgebaseList } from './components/knowledgebase-list/knowledgebase-list';
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
];
