import { Component, output, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-knowledgebase-add-dialog',
  imports: [Dialog, FileUpload],
  templateUrl: './knowledgebase-add-dialog.html',
  styleUrl: './knowledgebase-add-dialog.scss',
})
export class KnowledgebaseAddDialog {
  onUpload = output<FormData>();
  visible = signal<boolean>(true);

  handleHide() {
    this.visible.set(false);
  }

  onFileUpload(event: any) {
    let formData = new FormData();
    formData.append('file', event.files[0]);
    this.onUpload.emit(formData);
  }
}
