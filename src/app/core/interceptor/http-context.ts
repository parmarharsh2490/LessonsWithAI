import { HttpContext, HttpContextToken } from '@angular/common/http';

export const MODULE_NAME_TOKEN = new HttpContextToken<string>(() => '');
export const MODULE_NAME = (moduleName: string) =>
  new HttpContext().set(MODULE_NAME_TOKEN, moduleName);

export const SKIP_TOAST_TOKEN = new HttpContextToken<boolean>(() => false);
export const SKIP_TOAST = () => new HttpContext().set(SKIP_TOAST_TOKEN, true);
