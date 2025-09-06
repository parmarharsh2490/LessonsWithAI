import { Component, createComponent, OnInit, signal } from '@angular/core';
import { TableList } from '../../../components/table-list/table-list';
import { PaginatorState } from 'primeng/paginator';
import { IHeader } from '../../../components/table-list/model/table-list.modal';
import { KnowledgebaseService } from '../service/knowledgebase.service';
import { IKnowledgeBase } from '../model/knowledgebase.model';
import { LazyLoadComponentService } from '../../../services/lazy load/lazyload-component.service';
import { KnowledgebaseAddDialog } from '../knowledgebase-add-dialog/knowledgebase-add-dialog';

@Component({
  selector: 'app-knowledgebase-list',
  imports: [TableList],
  templateUrl: './knowledgebase-list.html',
  styleUrl: './knowledgebase-list.scss',
})
export class KnowledgebaseList implements OnInit {
  dataList = signal<IKnowledgeBase[]>([]);
  headerList = signal<IHeader[]>([
    {
      label: 'Document Name',
      key: 'fileName',
    },
    {
      label: 'Document Type',
      key: 'type',
    },
    {
      label: 'Document Size',
      key: 'fileSize',
    },
    {
      label: 'Created At',
      key: 'createdAt',
    },
  ]);

  constructor(
    private knowledgebaseService: KnowledgebaseService,
    private lazyLoadComponentService: LazyLoadComponentService<KnowledgebaseAddDialog>,
  ) {}
  ngOnInit(): void {
    this.knowledgebaseService.getKnowledgebaseList().subscribe((res) => {
      this.dataList.set(res);
    });
    this.onAdd();
  }

  onPageChange(event: PaginatorState) {
    event = { ...event };
  }

  onDelete(event: any) {
    event;
  }

  async onAdd() {
    const KnowledgebaseAddDialog = await import(
      '../knowledgebase-add-dialog/knowledgebase-add-dialog'
    ).then((m) => m.KnowledgebaseAddDialog);
    this.lazyLoadComponentService.componentRef = createComponent(
      KnowledgebaseAddDialog,
      {
        environmentInjector: this.lazyLoadComponentService.injector,
      },
    );
    this.lazyLoadComponentService.applicationRef.attachView(
      this.lazyLoadComponentService.componentRef.hostView,
    );
    document.body.appendChild(
      this.lazyLoadComponentService.componentRef.location.nativeElement,
    );
  }
}
