import { Injectable } from '@angular/core';
import { IUser } from '../model/user.model';
import { BaseService } from '../../../core/base/base-service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService extends BaseService<IUser> {
  override getModuleName(): string {
    return 'user';
  }
}
