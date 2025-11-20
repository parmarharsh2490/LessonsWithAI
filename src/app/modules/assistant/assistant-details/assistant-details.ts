import {
  Component,
  createComponent,
  ElementRef,
  model,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { AssistantOverview } from '../assistant-overview/assistant-overview';
import { LazyLoadComponentService } from '../../../services/lazy load/lazyload-component.service';
import { AssistantKnowledgeBase } from '../assistant-knowledge-base/assistant-knowledge-base';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'primeng/tabs';
import { IAssistant } from '../model/assistant.model';
import { AssistantService } from '../service/assistant.service';
import { firstValueFrom } from 'rxjs';
import { Button } from 'primeng/button';
import { KnowledgebaseService } from '../../knowledgebase/service/knowledgebase.service';
import { IKnowledgeBase } from '../../knowledgebase/model/knowledgebase.model';
import { IBaseServiceActions } from '../../../core/base/base-service-actions';

@Component({
  selector: 'app-assistant-details',
  imports: [
    Dialog,
    AssistantOverview,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Button,
  ],
  providers: [LazyLoadComponentService],
  templateUrl: './assistant-details.html',
  styleUrl: './assistant-details.scss',
})
export class AssistantDetails {
  assistant = model<IAssistant | undefined>(undefined);
  loading = signal<boolean>(false);
  @ViewChild('loadAssistantKnowledgeBase')
  loadAssistantKnowledgeBase!: ElementRef;
  onHide = output<void>();
  visible = signal<boolean>(true);
  constructor(
    private lazyLoadComponentService: LazyLoadComponentService<AssistantKnowledgeBase>,
    private service: AssistantService,
    private knowledgeBaseService: KnowledgebaseService,
  ) {}

  handleHide(): void {
    this.visible.set(false);
    this.onHide.emit();
  }

  async onTabChange(event: any) {
    if (event === 'Knowledge Base') {
      if (this.lazyLoadComponentService.componentRef) return;
      const AssistantKnowledgeBase = await import(
        '../assistant-knowledge-base/assistant-knowledge-base'
      ).then((m) => m.AssistantKnowledgeBase);
      this.lazyLoadComponentService.componentRef = createComponent(
        AssistantKnowledgeBase,
        {
          environmentInjector: this.lazyLoadComponentService.injector,
          hostElement: this.loadAssistantKnowledgeBase.nativeElement,
        },
      );
      this.lazyLoadComponentService.componentRef.setInput(
        'assistant',
        this.assistant(),
      );
      this.lazyLoadComponentService.componentRef.instance.onAssistantChange.subscribe(
        (event) => {
          this.onAssistantChange(event);
          this.lazyLoadComponentService.componentRef?.setInput(
            'assistant',
            this.assistant(),
          );
        },
      );
      this.lazyLoadComponentService.applicationRef.attachView(
        this.lazyLoadComponentService.componentRef.hostView,
      );
    }
  }

  tabs = [
    {
      label: 'Overview',
      icon: 'pi pi-home',
    },
    {
      label: 'Knowledge Base',
      icon: 'pi pi-book',
    },
  ];

  async saveAssistant() {
    this.assistant.set({
      ...this.assistant()!,
      userId: localStorage.getItem('userId')!,
    });
    let action: keyof IBaseServiceActions = this.assistant()?.id
      ? 'update'
      : 'save';
    this.loading.set(true);
    console.log(this.assistant());

    try {
      let toolId = await this.handleKnowledgeBaseOperation();
      this.assistant.set({
        ...this.assistant()!,
        toolId: toolId || undefined,
      });
      await firstValueFrom(this.service[action](this.assistant()!));
    } finally {
      // this.handleHide();
      this.loading.set(false);
    }
  }

  async handleKnowledgeBaseOperation(): Promise<string | undefined> {
    let assistant = this.assistant()!;
    let knowledgebasePayload: IKnowledgeBase = assistant?.knowledgebase!;

    let existKnowlegebase =
      assistant?.knowledgebase?.id && assistant?.knowledgebase?.toolId;
    // 1 => delete if empty
    if (
      knowledgebasePayload?.fileIds?.length === 0 &&
      existKnowlegebase &&
      this.loadAssistantKnowledgeBase?.nativeElement?.children?.length != 0
    ) {
      await firstValueFrom(
        this.knowledgeBaseService.delete(
          assistant?.knowledgebase?.id!,
          assistant?.knowledgebase?.toolId!,
        ),
      );
      return undefined;
    }

    if (knowledgebasePayload?.fileIds?.length === 0) return undefined;

    let action: keyof IBaseServiceActions = !existKnowlegebase
      ? 'save'
      : 'update';

    let response = await firstValueFrom(
      this.knowledgeBaseService?.[action](knowledgebasePayload),
    );
    return response.data?.toolId ?? undefined;
  }
  onAssistantChange(event: IAssistant) {
    this.assistant.set(event);
  }
}
