import { Routes } from '@angular/router';

export const assistantRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./assistant-lists/assistant-lists').then((m) => m.AssistantLists),
  },
];
