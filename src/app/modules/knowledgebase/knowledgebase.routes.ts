import { Routes } from '@angular/router';

export const knowledgebaseRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./knowledgebase-list/knowledgebase-list').then(
        (m) => m.KnowledgebaseList,
      ),
  },
];
