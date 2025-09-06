import {
  AfterViewInit,
  Component,
  EventEmitter,
  input,
  OnInit,
  Output,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { PaginatorState } from 'primeng/paginator';
import { IHeader } from './model/table-list.modal';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-table-list',
  imports: [TableModule, Button, ConfirmDialog, DatePipe],
  templateUrl: './table-list.html',
  styleUrl: './table-list.scss',
})
export class TableList implements OnInit, AfterViewInit {
  headerList = input<IHeader[]>([]);
  dataList = input<any[] | null>(null);
  pageHeader = input<string>('');
  onPageChange = output<PaginatorState>();
  pageSize = input<number>();
  totalRecords = input<number>();
  showEdit = signal<boolean>(false);
  showDelete = signal<boolean>(false);
  showAdd = signal<boolean>(false);
  isRowClick = signal<boolean>(false);
  onAdd = output<void>();
  onDelete = output<any>();
  onEdit = output<any>();
  onRowClick = output<any>();
  @Output() onPageChavngee = new EventEmitter<any>();
  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupEventListening();
  }

  setupEventListening() {
    this.eventListening(this.onRowClick, this.isRowClick);
    this.eventListening(this.onAdd, this.showAdd);
    this.eventListening(this.onEdit, this.showEdit);
    this.eventListening(this.onDelete, this.showDelete);
  }

  eventListening(event: OutputEmitterRef<any>, key: WritableSignal<boolean>) {
    if ((event as any).listeners && (event as any).listeners.length > 0) {
      key.set(true);
    }
  }

  handleDelete(data: any) {
    this.confirmationService.confirm({
      header: 'Delete',
      message: 'Are you sure you want to delete this item?',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        data = { ...data };
      },
    });
  }

  handleEdit(data: any) {
    this.onEdit.emit(data);
  }
  handleAdd() {
    this.onAdd.emit();
  }
}
