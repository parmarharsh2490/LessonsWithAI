import { Injectable } from '@angular/core';
import { IAssistant } from '../model/assistant.model';
import { BaseService } from '../../../core/base/base-service';
@Injectable({
  providedIn: 'root',
})
export class AssistantService extends BaseService<IAssistant> {
  override getModuleName(): string {
    return 'assistant';
  }
}
