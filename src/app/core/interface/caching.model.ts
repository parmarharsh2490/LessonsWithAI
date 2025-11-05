import { CachingKey } from '../constants/caching.constants';

export interface ICaching {
  key: CachingKey;
  metadata: object;
  data: any;
  expiresAt?: Date;
}
