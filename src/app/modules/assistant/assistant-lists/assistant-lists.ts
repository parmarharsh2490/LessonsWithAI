import { Component, OnInit, signal } from '@angular/core';
import { TableList } from '../../../components/table-list/table-list';
import { PaginatorState } from 'primeng/paginator';
import { IHeader } from '../../../components/table-list/model/table-list.modal';
import { AssistantService } from '../../../services/assistant.service';
import { IAssistant } from '../model/assistant.model';

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

  constructor(public assistantService: AssistantService) {}

  ngOnInit(): void {
    this.assistantService.getAssistants().subscribe((data: IAssistant[]) => {
      this.dataList.set(data);
    });
  }

  onPageChange(event: PaginatorState) {
    console.log(event);
  }
}
