import {
  ApplicationRef,
  Component,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  OnInit,
  signal,
} from '@angular/core';
import { TableList } from '../../../components/table-list/table-list';
import { PaginatorState } from 'primeng/paginator';
import { IHeader } from '../../../components/table-list/model/table-list.modal';
import { AssistantService } from '../service/assistant.service';
import { IAssistantList } from '../model/assistant.model';
import { AssistantDetails } from '../assistant-details/assistant-details';

@Component({
  selector: 'app-assistant-lists',
  imports: [TableList],
  templateUrl: './assistant-lists.html',
  styleUrl: './assistant-lists.scss',
})
export class AssistantLists implements OnInit {
  componentRef: ComponentRef<AssistantDetails> | null = null;
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
    private injector: EnvironmentInjector,
    private applicationRef: ApplicationRef,
  ) {}

  ngOnInit(): void {
    this.assistantService
      .getAssistants()
      .subscribe((data: IAssistantList[]) => {
        this.dataList.set(data);
      });
  }

  onPageChange(event: PaginatorState) {
    console.log(event);
  }
  async onEdit(data: any) {
    console.log('Data', data);
    const AssistantDetails = await import(
      '../assistant-details/assistant-details'
    ).then((m) => m.AssistantDetails);

    this.componentRef = createComponent(AssistantDetails, {
      environmentInjector: this.injector,
    });
    this.componentRef.instance.onAssistantDetailsPopupHide.subscribe(() => {
      this.componentRef?.destroy();
      this.componentRef = null;
    });
    this.applicationRef.attachView(this.componentRef.hostView);
    document.body.appendChild(this.componentRef.location.nativeElement);
    this.componentRef.changeDetectorRef.detectChanges();
  }
}
