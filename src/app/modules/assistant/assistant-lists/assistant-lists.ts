import { Component, createComponent, OnInit, signal } from '@angular/core';
import { TableList } from '../../../components/table-list/table-list';
import { PaginatorState } from 'primeng/paginator';
import { IHeader } from '../../../components/table-list/model/table-list.modal';
import { AssistantService } from '../service/assistant.service';
import { AssistantDetails } from '../assistant-details/assistant-details';
import { LazyLoadComponentService } from '../../../services/lazy load/lazyload-component.service';
import { AssistantDataService } from '../service/assistant-data.service';
import { SEOService } from '../../../services/seo.service';
import { IResponseData } from '../../../core/response/response-data';
import { IAssistant } from '../model/assistant.model';
import { CommonService } from '../../../services/common-service';

@Component({
  selector: 'app-assistant-lists',
  imports: [TableList],
  templateUrl: './assistant-lists.html',
  styleUrl: './assistant-lists.scss',
})
export class AssistantLists implements OnInit {
  dataList = signal<IAssistant[]>([]);
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
    private seoService: SEOService,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    // Set SEO meta tags for assistants page
    this.seoService.updateSEO(this.seoService.getAssistantsSEO());

    if (!this.commonService.isBrowser) return;
    this.assistantService
      .getAll()
      .subscribe((data: IResponseData<IAssistant>) => {
        this.dataList.set(data.dataList);
      });
  }

  onPageChange(event: PaginatorState) {
    event = { ...event };
  }
  async onEdit(data: IAssistant) {
    await this.lazyLoadAssistantDetailsComponent(data._id);
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
