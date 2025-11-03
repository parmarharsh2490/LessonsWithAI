import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/base/base-service';
import { IDocument } from '../model/document.model';
import { Observable } from 'rxjs';
import { IResponseData } from '../../../core/response/response-data';
import { environment } from '../../../../environment/environment';
import { MODULE_NAME } from '../../../core/interceptor/http-context';

@Injectable({
  providedIn: 'root',
})
export class DocumentService extends BaseService<IDocument> {
  override getModuleName(): string {
    return 'document';
  }

  upload(data: FormData): Observable<IResponseData<IDocument>> {
    return this.http.post<IResponseData<IDocument>>(
      environment.baseUrl + this.getModuleName() + '/save',
      data,
      {
        context: MODULE_NAME(this.getModuleName()),
      },
    );
  }
}
