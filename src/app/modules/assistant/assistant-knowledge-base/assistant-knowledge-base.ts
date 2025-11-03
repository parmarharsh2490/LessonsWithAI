import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Select, SelectChangeEvent } from 'primeng/select';
import { IAssistant } from '../model/assistant.model';
import { toSignal } from '../../../core/base/safe-signal';
import { DocumentService } from '../../knowledgebase/service/document.service';
import { IDocument } from '../../knowledgebase/model/document.model';
import { KnowledgebaseService } from '../../knowledgebase/service/knowledgebase.service';
import { IKnowledgeBase } from '../../knowledgebase/model/knowledgebase.model';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-assistant-knowledge-base',
  imports: [Select],
  templateUrl: './assistant-knowledge-base.html',
  styleUrl: './assistant-knowledge-base.scss',
})
export class AssistantKnowledgeBase implements OnInit {
  private documentService = inject(DocumentService);
  private knowledgeBaseService = inject(KnowledgebaseService);

  onAssistantChange = output<IAssistant>();
  assistant = input<IAssistant>();
  tool = signal<IKnowledgeBase | null>(null);
  documentList = toSignal(this.documentService.getAll());
  remainingDocumentList = computed<IDocument[]>(() => {
    return this.documentList().filter(
      (item: IDocument) =>
        !this.assistant()?.knowledgebase?.fileIds?.includes(item.documentId),
    );
  });

  async ngOnInit(): Promise<void> {
    try {
      this.tool.set(
        (
          await firstValueFrom(
            this.knowledgeBaseService.getById(this.assistant()?.id!),
          )
        ).data,
      );
      this.onAssistantChange.emit({
        ...this.assistant()!,
        knowledgebase: this.tool()!,
      });
    } catch (error) {
      console.error(error);
    }
  }

  onChange(event: SelectChangeEvent, selectKnowledgeBase: Select) {
    if (!event?.value?.documentId) return;
    if (
      this.assistant()?.knowledgebase?.fileIds?.includes(
        event.value?.documentId,
      )
    ) {
      return;
    }
    let assistant: IAssistant = {
      ...this.assistant()!,
      knowledgebase: {
        ...this.assistant()?.knowledgebase!,
        fileIds: [
          ...(this.assistant()?.knowledgebase?.fileIds || []),
          event.value?.documentId,
        ],
      },
    };
    this.onAssistantChange.emit(assistant);
    selectKnowledgeBase?.clear();
  }

  onDelete(item: IDocument) {
    let fileIds =
      this.assistant()?.knowledgebase?.fileIds?.filter(
        (toolId: string) => toolId !== item.documentId,
      ) || [];
    let assistant = {
      ...this.assistant()!,
      knowledgebase: {
        ...this.assistant()?.knowledgebase!,
        fileIds: fileIds,
      },
    };
    this.onAssistantChange.emit(assistant);
  }
}
