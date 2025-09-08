import { Component, computed, OnInit, signal } from '@angular/core';
import { IKnowledgeBase } from '../../knowledgebase/model/knowledgebase.model';
import { KnowledgebaseService } from '../../knowledgebase/service/knowledgebase.service';
import { Select, SelectChangeEvent } from 'primeng/select';
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
        !this.assistantDataService.assistant().toolIds.includes(item._id),
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

  onChange(event: SelectChangeEvent) {
    this.assistantDataService.updateAssistant({
      toolIds: [
        ...this.assistantDataService.assistant().toolIds,
        event.value?._id,
      ],
    });
    event.value = null;
  }

  onDelete(item: IKnowledgeBase) {
    this.assistantDataService.updateAssistant({
      toolIds: this.assistantDataService
        .assistant()
        .toolIds.filter((id: string) => id !== item._id),
    });
  }
}
