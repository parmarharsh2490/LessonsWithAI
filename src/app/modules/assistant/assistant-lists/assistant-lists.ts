import { Component, createComponent, OnInit, signal } from '@angular/core';
import { TableList } from '../../../components/table-list/table-list';
import { PaginatorState } from 'primeng/paginator';
import { IHeader } from '../../../components/table-list/model/table-list.modal';
import { AssistantService } from '../service/assistant.service';
import { AssistantDetails } from '../assistant-details/assistant-details';
import { LazyLoadComponentService } from '../../../services/lazy load/lazyload-component.service';
import { SEOService } from '../../../services/seo.service';
import { IResponseData } from '../../../core/response/response-data';
import { IAssistant } from '../model/assistant.model';
import { CommonService } from '../../../services/common-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-assistant-lists',
  imports: [TableList],
  providers: [LazyLoadComponentService],
  templateUrl: './assistant-lists.html',
  styleUrl: './assistant-lists.scss',
})
export class AssistantLists implements OnInit {
  dataList = signal<IAssistant[]>([]);
  headerList = signal<IHeader<IAssistant>[]>([
    {
      label: 'Assistant Name',
      key: 'name',
    },
    {
      label: 'Model',
      key: 'modelName',
    },
    {
      label: 'Voice',
      key: 'voiceName',
    },
    {
      label: 'Created At',
      key: 'createdAt',
      type: 'date',
    },
    {
      label: 'Updated At',
      key: 'updatedAt',
      type: 'date',
    },
  ]);
  constructor(
    private assistantService: AssistantService,
    public lazyLoadComponentService: LazyLoadComponentService<AssistantDetails>,
    private seoService: SEOService,
    private commonService: CommonService,
  ) {
    toObservable(this.assistantService.getAllCall).subscribe(() => {
      if (!this.commonService.isBrowser) return;
      this.assistantService
        .getAll()
        .subscribe((data: IResponseData<IAssistant>) => {
          this.dataList.set(data.dataList);
        });
    });
  }

  ngOnInit(): void {
    // Set SEO meta tags for assistants page
    this.seoService.updateSEO(this.seoService.getAssistantsSEO());
  }

  onPageChange(event: PaginatorState) {
    event = { ...event };
  }
  async onEdit(data: IAssistant) {
    await this.lazyLoadAssistantDetailsComponent(data.id);
  }

  async onAdd() {
    await this.lazyLoadAssistantDetailsComponent();
  }

  async lazyLoadAssistantDetailsComponent(id: string | null = null) {
    let assistant: IAssistant | undefined;
    if (id) {
      assistant = (await firstValueFrom(this.assistantService.getById(id)))
        .data;
    }
    const AssistantDetails = await import(
      '../assistant-details/assistant-details'
    ).then((m) => m.AssistantDetails);

    this.lazyLoadComponentService.componentRef = createComponent(
      AssistantDetails,
      {
        environmentInjector: this.lazyLoadComponentService.injector,
      },
    );
    this.lazyLoadComponentService.componentRef.setInput('assistant', assistant);
    this.lazyLoadComponentService.applicationRef.attachView(
      this.lazyLoadComponentService.componentRef.hostView,
    );
    document.body.appendChild(
      this.lazyLoadComponentService.componentRef.location.nativeElement,
    );
  }

  onDelete(event: IAssistant) {
    firstValueFrom(
      this.assistantService.delete(event.id, event.assistantId),
    ).finally(() => {
      this.assistantService.getAllCall.set(!this.assistantService.getAllCall());
    });
  }
}
