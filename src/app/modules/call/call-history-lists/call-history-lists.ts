import { Component, OnInit, signal } from '@angular/core';
import { TableList } from '../../../components/table-list/table-list';
import { PaginatorState } from 'primeng/paginator';
import { IHeader } from '../../../components/table-list/model/table-list.modal';
import { HttpClient, HttpContext } from '@angular/common/http';
import { SUCCESS_MESSAGE } from '../../../core/response/resonse-message';
@Component({
  selector: 'app-call-history-lists',
  imports: [TableList],
  templateUrl: './call-history-lists.html',
  styleUrl: './call-history-lists.scss',
})
export class CallHistoryLists implements OnInit {
  onPageChange(event: PaginatorState) {
    console.log(event);
  }

  dataList = signal<any[]>(
    Array.from({ length: 12 }, (_, index) => ({
      time: `22-07-2025 08:${String(index + 20).padStart(2, '0')}`,
      call_duration: `00:${String(index + 3).padStart(2, '0')}`,
      call_outcome: ['Other', 'Call Completed Normally', 'Meeting Booked'][
        index % 3
      ],
      call_sentiment: ['Neutral', 'Positive', 'NA'][index % 3],
      followup_status: ['No Followup', 'Timely Follow Up', 'NA'][index % 3],
      objective_achievement: [
        'Not Achieved',
        'Achieved',
        'Partially Achieved',
        'NA',
      ][index % 4],
      disconnection_reason: 'Failed',
      call_status: 'ended',
    })),
  );

  headerList = signal<IHeader[]>([
    {
      label: 'Time',
      key: 'time',
    },
    {
      label: 'Call Duration',
      key: 'call_duration',
    },
    {
      label: 'Call Outcome',
      key: 'call_outcome',
    },
    {
      label: 'Call Sentiment',
      key: 'call_sentiment',
    },
    {
      label: 'FollowUp Status',
      key: 'followup_status',
    },
    {
      label: 'Objective Achievement',
      key: 'objective_achievement',
    },
    {
      label: 'Disconnection Reason',
      key: 'disconnection_reason',
    },
    {
      label: 'Call Status',
      key: 'call_status',
    },
  ]);

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http
      .get('https://dummyjson.com/products', {
        context: new HttpContext().set(
          SUCCESS_MESSAGE,
          'Data Received Succesfully',
        ),
      })
      .subscribe(
        (data: any) => {
          console.log('Data', data.length);
        },
        (error) => {
          console.log('Error', error);
        },
      );
  }
}
