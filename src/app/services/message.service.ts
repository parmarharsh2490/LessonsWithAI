import { inject, Injectable } from '@angular/core';
import { MessageService as PrimeMessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageService = inject(PrimeMessageService);

  showSuccessToast(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  showErrorToast(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  showInfoToast(message: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
    });
  }

  showWarnToast(message: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: message,
    });
  }
}
