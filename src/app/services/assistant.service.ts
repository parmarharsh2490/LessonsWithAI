import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IAssistant } from '../modules/assistant/model/assistant.model';
@Injectable({
  providedIn: 'root',
})
export class AssistantService {
  getAssistants() {
    return of<IAssistant[]>([
      {
        id: '1',
        assistant_name: 'Assistant 1',
        model: 'assistant1',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: '2',
        assistant_name: 'Assistant 2',
        model: 'assistant2',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  }
}
