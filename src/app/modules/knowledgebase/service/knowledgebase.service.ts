import { IKnowledgeBase } from '../model/knowledgebase.model';
import { BaseService } from '../../../core/base/base-service';
import { Injectable } from '@angular/core';
import { IResponseData } from '../../../core/response/response-data';
import { Observable } from 'rxjs';
import { SKIP_TOAST } from '../../../core/interceptor/http-context';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class KnowledgebaseService extends BaseService<IKnowledgeBase> {
  override getModuleName(): string {
    return 'knowledgebase';
  }

  override getById(id: string): Observable<IResponseData<IKnowledgeBase>> {
    return this.http.get<IResponseData<IKnowledgeBase>>(
      environment.baseUrl + this.getModuleName() + '/' + id,
      {
        context: SKIP_TOAST(),
      },
    );
  }
}
