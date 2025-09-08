import { HttpContext, HttpContextToken } from '@angular/common/http';

export enum ResponseMessage {
  SUCCESS = 'Success',
  ERROR = 'Error',
  INFO = 'Info',
  WARN = 'Warn',
}

export const SUCCESS_MESSAGE_TOAST = new HttpContextToken<string>(() => '');
export const ERROR_MESSAGE_TOAST = new HttpContextToken<string>(() => '');
export const INFO_MESSAGE_TOAST = new HttpContextToken<string>(() => '');
export const WARN_MESSAGE_TOAST = new HttpContextToken<string>(() => '');

export const SUCCESS_MESSAGE = (message: string) =>
  new HttpContext().set(SUCCESS_MESSAGE_TOAST, message);
export const ERROR_MESSAGE = (message: string) =>
  new HttpContext().set(ERROR_MESSAGE_TOAST, message);
export const INFO_MESSAGE = (message: string) =>
  new HttpContext().set(INFO_MESSAGE_TOAST, message);
export const WARN_MESSAGE = (message: string) =>
  new HttpContext().set(WARN_MESSAGE_TOAST, message);

export const TOAST_MESSAGES = (
  successMessage?: string,
  errorMessage?: string,
  infoMessage?: string,
  warnMessage?: string,
) => {
  const context = new HttpContext();
  if (successMessage) context.set(SUCCESS_MESSAGE_TOAST, successMessage);
  if (errorMessage) context.set(ERROR_MESSAGE_TOAST, errorMessage);
  if (infoMessage) context.set(INFO_MESSAGE_TOAST, infoMessage);
  if (warnMessage) context.set(WARN_MESSAGE_TOAST, warnMessage);
  return context;
};
