import {
  Component,
  createComponent,
  ElementRef,
  OnInit,
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

@Component({
  selector: 'app-assistant-details',
  imports: [Dialog, AssistantOverview, Tabs, TabList, Tab, TabPanels, TabPanel],
  providers: [LazyLoadComponentService],
  templateUrl: './assistant-details.html',
  styleUrl: './assistant-details.scss',
})
export class AssistantDetails implements OnInit {
  assistant = signal<IAssistant | null>(null);
  @ViewChild('loadAssistantKnowledgeBase')
  loadAssistantKnowledgeBase!: ElementRef;
  onHide = output<void>();
  visible = signal<boolean>(true);
  constructor(
    private lazyLoadComponentService: LazyLoadComponentService<AssistantKnowledgeBase>,
    private assistantService: AssistantService,
  ) {}

  ngOnInit(): void {
    this.assistantService.getAssistantById('1').subscribe((data) => {
      this.assistant.set(data);
    });
  }

  handleHide(): void {
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
      this.lazyLoadComponentService.componentRef.instance.updateAssistant.subscribe(
        (data) => {
          this.assistant.set(data);
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
}
