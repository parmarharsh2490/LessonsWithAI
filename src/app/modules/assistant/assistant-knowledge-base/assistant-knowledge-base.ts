import {
  Component,
  computed,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { IKnowledgeBase } from '../../knowledgebase/model/knowledgebase.model';
import { KnowledgebaseService } from '../../knowledgebase/service/knowledgebase.service';
import { IAssistant } from '../model/assistant.model';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-assistant-knowledge-base',
  imports: [Select],
  templateUrl: './assistant-knowledge-base.html',
  styleUrl: './assistant-knowledge-base.scss',
})
export class AssistantKnowledgeBase implements OnInit {
  knowledgeBaseList = signal<IKnowledgeBase[]>([]);
  assistant = input.required<IAssistant>();
  updateAssistant = output<IAssistant>();
  remainingKnowledgeBaseList = computed<IKnowledgeBase[]>(() => {
    return this.knowledgeBaseList().filter(
      (item: IKnowledgeBase) =>
        !this.assistant().model.toolIds.includes(item._id),
    );
  });

  constructor(private knowledgebaseService: KnowledgebaseService) {}
  ngOnInit(): void {
    this.knowledgebaseService
      .getKnowledgebaseList()
      .subscribe((data: IKnowledgeBase[]) => {
        this.knowledgeBaseList.set(data);
      });
  }

  onChange(event: any) {
    let newAssistant = { ...this.assistant() };
    newAssistant.model.toolIds.push(event.value._id);
    this.updateAssistant.emit(newAssistant);
  }

  onDelete(item: IKnowledgeBase) {
    let newAssistant = { ...this.assistant() };
    newAssistant.model.toolIds = newAssistant.model.toolIds.filter(
      (id: string) => id !== item._id,
    );
    this.updateAssistant.emit(newAssistant);
  }
}
