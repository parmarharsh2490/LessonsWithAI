import { Routes } from '@angular/router';

export const callRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./call-history-lists/call-history-lists').then(
        (m) => m.CallHistoryLists,
      ),
  },
];
