import { HttpContext, HttpContextToken } from '@angular/common/http';

export const MODULE_NAME_TOKEN = new HttpContextToken<string>(() => '');
export const MODULE_NAME = (moduleName: string) =>
  new HttpContext().set(MODULE_NAME_TOKEN, moduleName);

export const MODULE_ID_TOKEN = new HttpContextToken<string>(() => '');
export const MODULE_ID = (id: string) =>
  new HttpContext().set(MODULE_ID_TOKEN, id);

export const SKIP_TOAST_TOKEN = new HttpContextToken<boolean>(() => false);
export const SKIP_TOAST = () => new HttpContext().set(SKIP_TOAST_TOKEN, true);

export const SKIP_LOADING_TOKEN = new HttpContextToken<boolean>(() => false);
export const SKIP_LOADING = () =>
  new HttpContext().set(SKIP_LOADING_TOKEN, true);

export const SKIP_CACHING_TOKEN = new HttpContextToken<boolean>(() => false);
export const SKIP_CACHING = () =>
  new HttpContext().set(SKIP_CACHING_TOKEN, true);
