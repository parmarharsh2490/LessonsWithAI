import { Component, input, output } from '@angular/core';
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
export class TableList {
  headerList = input<IHeader[]>([]);
  dataList = input<any[] | null>(null);
  pageHeader = input<string>('');
  onPageChange = output<PaginatorState>();
  pageSize = input<number>();
  totalRecords = input<number>();
  showEdit = input<boolean>(true);
  showDelete = input<boolean>(true);
  showAddButton = input<boolean>(true);
  onAdd = output<void>();
  onDelete = output<any>();
  onEdit = output<any>();
  constructor(private confirmationService: ConfirmationService) {}

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
        console.log('Delete', data);
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
