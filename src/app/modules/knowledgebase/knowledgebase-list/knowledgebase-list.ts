import { Component, signal } from '@angular/core';
import { TableList } from '../../../components/table-list/table-list';
import { PaginatorState } from 'primeng/paginator';
import { IHeader } from '../../../components/table-list/model/table-list.modal';

@Component({
  selector: 'app-knowledgebase-list',
  imports: [TableList],
  templateUrl: './knowledgebase-list.html',
  styleUrl: './knowledgebase-list.scss',
})
export class KnowledgebaseList {
  onPageChange(event: PaginatorState) {
    event = { ...event };
  }
  dataList = signal<any[]>(
    Array.from({ length: 12 }, (_, index) => ({
      document_name: `document_name ${index}`,
      document_type: `document_type ${index}`,
      document_size: `document_size ${index}`,
      document_status: `document_status ${index}`,
      created_at: `created_at ${index}`,
    })),
  );
  headerList = signal<IHeader[]>([
    {
      label: 'Document Name',
      key: 'document_name',
    },
    {
      label: 'Document Type',
      key: 'document_type',
    },
    {
      label: 'Document Size',
      key: 'document_size',
    },
    {
      label: 'Document Status',
      key: 'document_status',
    },
    {
      label: 'Created At',
      key: 'created_at',
    },
  ]);
}
