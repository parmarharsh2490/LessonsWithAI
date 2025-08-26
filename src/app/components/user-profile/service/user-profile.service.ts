import { Injectable } from '@angular/core';
import { IUser } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: HttpClient) {}
  saveUserProfile(user: IUser): Observable<any> {
    return this.http.post('/profile', user);
  }
}
