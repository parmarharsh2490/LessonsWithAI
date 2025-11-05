import { Injectable, signal } from '@angular/core';
import { CachingKey } from '../constants/caching.constants';
import { ICaching } from '../interface/caching.model';

@Injectable({
  providedIn: 'root',
})
export class CachingService {
  cachingData = signal<Map<CachingKey, ICaching>>(
    new Map<CachingKey, ICaching>(),
  );

  get(key: CachingKey): ICaching | undefined {
    return this.cachingData().get(key as CachingKey);
  }

  getAll(): ICaching[] {
    return Array.from(this.cachingData().values());
  }

  set(
    key: CachingKey,
    data: any,
    metadata: object = {},
    expiresAt?: Date,
  ): void {
    let currentData = this.cachingData();
    currentData.set(key, {
      key: key,
      metadata: metadata,
      data: data,
      expiresAt: expiresAt || new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    this.cachingData.set(currentData);
  }

  invalidate(key: CachingKey): void {
    let currentData = this.cachingData();
    currentData.delete(key);
    this.cachingData.set(currentData);
  }
}
