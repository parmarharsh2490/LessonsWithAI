import { ErrorHandler } from '@angular/core';

export class GloblaErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Error Catch in Global Error Handler : ', error);
  }
}
