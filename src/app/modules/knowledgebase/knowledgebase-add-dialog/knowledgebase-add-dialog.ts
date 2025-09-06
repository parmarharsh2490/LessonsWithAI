import { Component, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { FileUpload } from 'primeng/fileupload';
import { KnowledgebaseService } from '../service/knowledgebase.service';

@Component({
  selector: 'app-knowledgebase-add-dialog',
  imports: [Dialog, FileUpload],
  templateUrl: './knowledgebase-add-dialog.html',
  styleUrl: './knowledgebase-add-dialog.scss',
})
export class KnowledgebaseAddDialog {
  visible = signal<boolean>(true);
  constructor(private knowledgebaseService: KnowledgebaseService) {}
  handleHide() {
    this.visible.set(false);
  }

  onUpload(event: any) {
    event;
    this.knowledgebaseService;
  }
}
