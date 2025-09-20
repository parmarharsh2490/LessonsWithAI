import { inject, Injectable } from '@angular/core';
import { IUser } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { IResponseData } from '../../../core/response/response-data';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private http = inject(HttpClient);
  saveUserProfile(user: IUser): Observable<IResponseData<IUser>> {
    return this.http.post<IResponseData<IUser>>(
      environment.baseUrl + '/user',
      user,
    );
  }

  getUser(): Observable<IResponseData<IUser>> {
    return this.http.get<IResponseData<IUser>>(environment.baseUrl, {
      credentials: 'include',
    });
  }
}
