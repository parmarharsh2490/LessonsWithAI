import { Component, computed, OnInit, signal } from '@angular/core';
import { IKnowledgeBase } from '../../knowledgebase/model/knowledgebase.model';
import { KnowledgebaseService } from '../../knowledgebase/service/knowledgebase.service';
import { Select } from 'primeng/select';
import { AssistantDataService } from '../service/assistant-data.service';

@Component({
  selector: 'app-assistant-knowledge-base',
  imports: [Select],
  templateUrl: './assistant-knowledge-base.html',
  styleUrl: './assistant-knowledge-base.scss',
})
export class AssistantKnowledgeBase implements OnInit {
  knowledgeBaseList = signal<IKnowledgeBase[]>([]);
  remainingKnowledgeBaseList = computed<IKnowledgeBase[]>(() => {
    return this.knowledgeBaseList().filter(
      (item: IKnowledgeBase) =>
        !this.assistantDataService.assistant().model.toolIds.includes(item._id),
    );
  });

  constructor(
    private knowledgebaseService: KnowledgebaseService,
    public assistantDataService: AssistantDataService,
  ) {}
  ngOnInit(): void {
    this.knowledgebaseService
      .getKnowledgebaseList()
      .subscribe((data: IKnowledgeBase[]) => {
        this.knowledgeBaseList.set(data);
      });
  }

  onChange(event: any) {
    let newAssistant = { ...this.assistantDataService.assistant() };
    newAssistant.model.toolIds.push(event.value._id);
    this.assistantDataService.updateAssistant(newAssistant);
  }

  onDelete(item: IKnowledgeBase) {
    let newAssistant = { ...this.assistantDataService.assistant() };
    newAssistant.model.toolIds = newAssistant.model.toolIds.filter(
      (id: string) => id !== item._id,
    );
    this.assistantDataService.updateAssistant(newAssistant);
  }
}
