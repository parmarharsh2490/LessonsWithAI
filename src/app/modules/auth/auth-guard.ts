import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CommonService } from '../../services/common-service';

export const authGuard: CanActivateFn = () => {
  const commonService = inject(CommonService);
  if (!commonService.isBrowser) return true;
  return true;
};
