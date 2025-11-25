import { Injectable, signal } from '@angular/core';
import { ICaching } from '../interface/caching.model';

@Injectable({
  providedIn: 'root',
})
export class CachingService {
  cachingData = signal<Map<string, ICaching>>(new Map<string, ICaching>());

  get(key: string): ICaching | undefined {
    const data = this.cachingData().get(key);
    if (data && data.expiresAt && data.expiresAt < new Date()) {
      this.invalidate(key);
      return undefined;
    }
    return data;
  }

  getAll(): ICaching[] {
    return Array.from(this.cachingData().values());
  }

  set(key: string, data: any, metadata: object = {}, expiresAt?: Date): void {
    let currentData = this.cachingData();
    const newData = new Map(currentData);
    if (newData.has(key)) {
      newData.delete(key);
    }
    newData.set(key, {
      key: key,
      metadata: metadata,
      data: data,
      expiresAt: expiresAt || new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
    });
    this.cachingData.set(newData);
  }

  invalidate(key: string): void {
    let currentData = this.cachingData();
    if (currentData.has(key)) {
      currentData.delete(key);
      this.cachingData.set(currentData);
    }
  }
}
