import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseData } from '../response/response-data';
import { IModel } from '../../modules/assistant/model/model.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { IVoice } from '../../modules/assistant/model/voice.model';

@Injectable({
  providedIn: 'root',
})
export class CommonList {
  private http = inject(HttpClient);

  getModels(): Observable<IResponseData<IModel>> {
    return this.http.get<IResponseData<IModel>>(
      environment.baseUrl + 'commonlist/model',
    );
  }

  getVoices(): Observable<IResponseData<IVoice>> {
    return this.http.get<IResponseData<IVoice>>(
      environment.baseUrl + 'commonlist/voice',
    );
  }
}
