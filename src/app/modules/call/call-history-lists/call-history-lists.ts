import { Component, createComponent, OnInit, signal } from '@angular/core';
import { TableList } from '../../../components/table-list/table-list';
import { PaginatorState } from 'primeng/paginator';
import { IHeader } from '../../../components/table-list/model/table-list.modal';
import { CallReport } from '../call-report/call-report';
import { LazyLoadComponentService } from '../../../services/lazy load/lazyload-component.service';
import { ICallReportLists } from '../model/call.model';
import { CallService } from '../service/call.service';
@Component({
  selector: 'app-call-history-lists',
  imports: [TableList],
  templateUrl: './call-history-lists.html',
  styleUrl: './call-history-lists.scss',
})
export class CallHistoryLists implements OnInit {
  dataList = signal<ICallReportLists[]>([]);

  headerList = signal<IHeader[]>([
    {
      label: 'Time',
      key: 'createdAt',
    },
    {
      label: 'Call Duration',
      key: 'callDuration',
    },
    {
      label: 'Call Outcome',
      key: 'callOutcome',
    },
    {
      label: 'Call Sentiment',
      key: 'callSentiment',
    },
    {
      label: 'FollowUp Status',
      key: 'followUpStatus',
    },
    {
      label: 'Objective Achievement',
      key: 'objectiveAchievement',
    },
    {
      label: 'Disconnection Reason',
      key: 'disconnectionReason',
    },
    {
      label: 'Call Status',
      key: 'callStatus',
    },
  ]);

  constructor(
    private lazyLoadComponentService: LazyLoadComponentService<CallReport>,
    private callService: CallService,
  ) {}
  ngOnInit(): void {
    this.callService
      .getCallHistoryLists()
      .subscribe((data: ICallReportLists[]) => {
        this.dataList.set(data);
      });
  }

  onPageChange(event: PaginatorState) {
    event = { ...event };
  }

  async onRowClick(event: ICallReportLists) {
    const CallReport = await import('../call-report/call-report').then(
      (m) => m.CallReport,
    );
    this.lazyLoadComponentService.componentRef = createComponent(CallReport, {
      environmentInjector: this.lazyLoadComponentService.injector,
    });
    this.lazyLoadComponentService.componentRef.setInput('callId', event._id);
    this.lazyLoadComponentService.applicationRef.attachView(
      this.lazyLoadComponentService.componentRef.hostView,
    );
    document.body.appendChild(
      this.lazyLoadComponentService.componentRef.location.nativeElement,
    );
  }
}
