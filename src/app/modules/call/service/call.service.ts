import { Injectable } from '@angular/core';
import { ICallReport } from '../model/call.model';
import { BaseService } from '../../../core/base/base-service';

@Injectable({
  providedIn: 'root',
})
export class CallService extends BaseService<ICallReport> {
  override getModuleName(): string {
    return 'call';
  }
}
