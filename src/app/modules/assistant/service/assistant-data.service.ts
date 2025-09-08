import { Injectable, signal } from '@angular/core';
import { IAssistant, IAssistantUpdate } from '../model/assistant.model';

@Injectable({
  providedIn: 'root',
})
export class AssistantDataService {
  intialAssistant: IAssistant = {
    _id: '',
    name: '',
    model: '',
    voice: '',
    toolIds: [],
    created_at: new Date(),
    updated_at: new Date(),
  };
  assistant = signal<IAssistant>(this.intialAssistant);

  updateAssistant(data: IAssistantUpdate) {
    this.assistant.update((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  }
}
