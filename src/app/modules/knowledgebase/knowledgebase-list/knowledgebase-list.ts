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
import { LazyLoadComponentService } from '../../../services/lazy load/lazyload-component.service';
import { KnowledgebaseAddDialog } from '../knowledgebase-add-dialog/knowledgebase-add-dialog';
import { SEOService } from '../../../services/seo.service';
import { DocumentService } from '../service/document.service';
import { IDocument } from '../model/document.model';
import { firstValueFrom, map } from 'rxjs';
import { CommonService } from '../../../services/common-service';

@Component({
  selector: 'app-knowledgebase-list',
  imports: [TableList],
  providers: [LazyLoadComponentService],
  templateUrl: './knowledgebase-list.html',
  styleUrl: './knowledgebase-list.scss',
})
export class KnowledgebaseList implements OnInit {
  private service = inject(DocumentService);
  private commonService = inject(CommonService);
  dataList = signal<IDocument[]>([]);
  headerList = signal<IHeader<IDocument>[]>([
    {
      label: 'Document Name',
      key: 'name',
      hyperlink: true,
    },
    {
      label: 'Document Type',
      key: 'type',
    },
    {
      label: 'Document Size',
      key: 'size',
    },
    {
      label: 'Created At',
      key: 'createdAt',
    },
  ]);

  constructor(
    private lazyLoadComponentService: LazyLoadComponentService<KnowledgebaseAddDialog>,
    private seoService: SEOService,
  ) {}

  ngOnInit(): void {
    // Set SEO meta tags for knowledge base page
    this.seoService.updateSEO(this.seoService.getKnowledgeBaseSEO());
    if (!this.commonService.isBrowser) return;
    this.getList();
  }

  onPageChange(event: PaginatorState) {
    event = { ...event };
  }

  onChange(event: {
    data: IDocument;
    event: { type: 'hyperlink'; key: keyof IDocument };
  }) {
    if (
      event?.event?.type === 'hyperlink' &&
      event?.event?.key === 'name' &&
      event.data.url
    ) {
      window.open(event.data.url, '_blank');
    }
  }

  async onDelete(event: IDocument) {
    await firstValueFrom(this.service.delete(event.id, event.documentId));
    this.getList();
  }

  async getList() {
    this.dataList.set(
      await firstValueFrom(
        this.service.getAll().pipe(map((data) => data.dataList)),
      ),
    );
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
    this.lazyLoadComponentService.componentRef.instance.onUpload.subscribe(
      (formData) => {
        this.submit(formData);
      },
    );
    this.lazyLoadComponentService.applicationRef.attachView(
      this.lazyLoadComponentService.componentRef.hostView,
    );
    document.body.appendChild(
      this.lazyLoadComponentService.componentRef.location.nativeElement,
    );
  }

  async submit(formData: FormData) {
    await firstValueFrom(this.service.upload(formData));
    this.getList();
    this.lazyLoadComponentService.componentRef?.instance?.handleHide?.();
  }
}
