import { Component, signal } from '@angular/core';
import { TableList } from '../table-list/table-list';
import { PaginatorState } from 'primeng/paginator';
import { IHeader } from '../table-list/model/table-list.modal';
@Component({
  selector: 'app-assistant-lists',
  imports: [TableList],
  templateUrl: './assistant-lists.html',
  styleUrl: './assistant-lists.scss',
})
export class AssistantLists {
  onPageChange(event: PaginatorState) {
    console.log(event);
  }
  dataList = signal<any[]>(
    Array.from({ length: 20 }, (_, index) => ({
      assistant_name: `assistant_name ${index}`,
      model: `model ${index}`,
      created_at: `created_at ${index}`,
      updated_at: `updated_at ${index}`,
    })),
  );
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
    },
    {
      label: 'Updated At',
      key: 'updated_at',
    },
  ]);
}
