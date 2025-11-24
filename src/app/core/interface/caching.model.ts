export interface ICaching {
  key: string;
  metadata: object;
  data: any;
  expiresAt?: Date;
}
