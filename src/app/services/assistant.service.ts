import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssistantService {
  getAssistants() {
    return of([
      {
        name: 'Assistant 1',
        value: 'assistant1',
        id: '1',
      },

      {
        name: 'Assistant 2',
        value: 'assistant2',
        id: '2',
      },
    ]);
  }
}
