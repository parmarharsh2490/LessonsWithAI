import { Injectable, signal } from '@angular/core';
import { IAssistant } from '../model/assistant.model';
import { BaseService } from '../../../core/base/base-service';
@Injectable({
  providedIn: 'root',
})
export class AssistantService extends BaseService<IAssistant> {
  getAllCall = signal<boolean>(false);
  override getModuleName(): string {
    return 'assistant';
  }
}
