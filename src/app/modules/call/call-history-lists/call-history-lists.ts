import {
  Component,
  createComponent,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { TableList } from '../../../components/table-list/table-list';
import { PaginatorState } from 'primeng/paginator';
import { IHeader } from '../../../components/table-list/model/table-list.modal';
import { CallReport } from '../call-report/call-report';
import { LazyLoadComponentService } from '../../../services/lazy load/lazyload-component.service';
import { ICallReport } from '../model/call.model';
import { SEOService } from '../../../services/seo.service';
import { toSignal } from '../../../core/base/safe-signal';
import { CallService } from '../service/call.service';
@Component({
  selector: 'app-call-history-lists',
  imports: [TableList],
  providers: [LazyLoadComponentService],
  templateUrl: './call-history-lists.html',
  styleUrl: './call-history-lists.scss',
})
export class CallHistoryLists implements OnInit {
  private service = inject(CallService);
  headerList = signal<IHeader<ICallReport>[]>([
    {
      label: 'Time',
      key: 'startedAt',
      type: 'date',
    },
    {
      label: 'Duration',
      key: 'duration',
    },
    {
      label: 'Status',
      key: 'status',
    },
    {
      label: 'Cost',
      key: 'cost',
    },
  ]);
  dataList = toSignal(this.service.getAll());

  constructor(
    private lazyLoadComponentService: LazyLoadComponentService<CallReport>,
    private seoService: SEOService,
  ) {}

  ngOnInit(): void {
    // Set SEO meta tags for call history page
    this.seoService.updateSEO(this.seoService.getCallHistorySEO());
  }

  onPageChange(event: PaginatorState) {
    event = { ...event };
  }

  async onRowClick(event: ICallReport) {
    const CallReport = await import('../call-report/call-report').then(
      (m) => m.CallReport,
    );
    this.lazyLoadComponentService.componentRef = createComponent(CallReport, {
      environmentInjector: this.lazyLoadComponentService.injector,
    });
    this.lazyLoadComponentService.componentRef.setInput('callId', event.id);
    this.lazyLoadComponentService.applicationRef.attachView(
      this.lazyLoadComponentService.componentRef.hostView,
    );
    document.body.appendChild(
      this.lazyLoadComponentService.componentRef.location.nativeElement,
    );
  }
}
