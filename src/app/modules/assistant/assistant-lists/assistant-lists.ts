import { Component, createComponent, OnInit, signal } from '@angular/core';
import { TableList } from '../../../components/table-list/table-list';
import { PaginatorState } from 'primeng/paginator';
import { IHeader } from '../../../components/table-list/model/table-list.modal';
import { AssistantService } from '../service/assistant.service';
import { IAssistantList } from '../model/assistant.model';
import { AssistantDetails } from '../assistant-details/assistant-details';
import { LazyLoadComponentService } from '../../../services/lazy load/lazyload-component.service';
import { AssistantDataService } from '../service/assistant-data.service';

@Component({
  selector: 'app-assistant-lists',
  imports: [TableList],
  templateUrl: './assistant-lists.html',
  styleUrl: './assistant-lists.scss',
})
export class AssistantLists implements OnInit {
  dataList = signal<IAssistantList[]>([]);
  headerList = signal<IHeader[]>([
    {
      label: 'Assistant Name',
      key: 'assistant_name',
    },
    {
      label: 'Model',
      key: 'model',
    },

    {
      label: 'Created At',
      key: 'created_at',
      type: 'date',
    },
    {
      label: 'Updated At',
      key: 'updated_at',
      type: 'date',
    },
  ]);
  constructor(
    private assistantService: AssistantService,
    public assistantDataService: AssistantDataService,
    public lazyLoadComponentService: LazyLoadComponentService<AssistantDetails>,
  ) {}

  ngOnInit(): void {
    this.assistantService
      .getAssistants()
      .subscribe((data: IAssistantList[]) => {
        this.dataList.set(data);
      });
  }

  onPageChange(event: PaginatorState) {
    event = { ...event };
  }
  async onEdit(data: IAssistantList) {
    await this.lazyLoadAssistantDetailsComponent(data.id);
  }

  async onAdd() {
    this.assistantDataService.updateAssistant(
      this.assistantDataService.intialAssistant,
    );
    await this.lazyLoadAssistantDetailsComponent();
  }

  async lazyLoadAssistantDetailsComponent(id: string | null = null) {
    const AssistantDetails = await import(
      '../assistant-details/assistant-details'
    ).then((m) => m.AssistantDetails);

    this.lazyLoadComponentService.componentRef = createComponent(
      AssistantDetails,
      {
        environmentInjector: this.lazyLoadComponentService.injector,
      },
    );
    this.lazyLoadComponentService.componentRef.setInput('assistantId', id);
    this.lazyLoadComponentService.applicationRef.attachView(
      this.lazyLoadComponentService.componentRef.hostView,
    );
    document.body.appendChild(
      this.lazyLoadComponentService.componentRef.location.nativeElement,
    );
  }

  onDelete(event: any) {
    event;
  }
}
