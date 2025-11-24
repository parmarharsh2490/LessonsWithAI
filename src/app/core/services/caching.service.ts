import { Injectable, signal } from '@angular/core';
import { ICaching } from '../interface/caching.model';

@Injectable({
  providedIn: 'root',
})
export class CachingService {
  cachingData = signal<Map<string, ICaching>>(new Map<string, ICaching>());

  get(key: string): ICaching | undefined {
    return this.cachingData().get(key);
  }

  getAll(): ICaching[] {
    return Array.from(this.cachingData().values());
  }

  set(key: string, data: any, metadata: object = {}, expiresAt?: Date): void {
    let currentData = this.cachingData();
    currentData.set(key, {
      key: key,
      metadata: metadata,
      data: data,
      expiresAt: expiresAt || new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    this.cachingData.set(currentData);
  }

  invalidate(key: string): void {
    let currentData = this.cachingData();
    if (currentData.has(key)) {
      currentData.delete(key);
      this.cachingData.set(currentData);
    }
  }
}
