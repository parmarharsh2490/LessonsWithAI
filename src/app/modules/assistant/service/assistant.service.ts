import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAssistant, IAssistantList } from '../model/assistant.model';
@Injectable({
  providedIn: 'root',
})
export class AssistantService {
  getAssistantById(id: string): Observable<IAssistant> {
    id = id;
    return of<IAssistant>({
      _id: '687077b967147df8dc46bcdf',
      model: 'chatgpt-4o-latest',
      name: 'test-assistant',
      voice: 'Xb7hH8MSUJpSbSDYk0k2',
      toolIds: [],
      created_at: new Date('2025-07-11T02:32:25.669Z'),
      updated_at: new Date('2025-08-24T11:05:48.373Z'),
    });
  }

  getAssistants() {
    return of<IAssistantList[]>([
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
