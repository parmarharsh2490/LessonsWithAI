import { HttpContextToken } from '@angular/common/http';

export enum ResponseMessage {
  SUCCESS = 'Success',
  ERROR = 'Error',
  INFO = 'Info',
  WARN = 'Warn',
}

export const SUCCESS_MESSAGE = new HttpContextToken<string>(
  () => ResponseMessage.SUCCESS,
);
export const ERROR_MESSAGE = new HttpContextToken<string>(
  () => ResponseMessage.ERROR,
);
export const INFO_MESSAGE = new HttpContextToken<string>(
  () => ResponseMessage.INFO,
);
export const WARN_MESSAGE = new HttpContextToken<string>(
  () => ResponseMessage.WARN,
);
