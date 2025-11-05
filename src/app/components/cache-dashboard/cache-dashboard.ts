import { Component, inject, signal } from '@angular/core';
import { CachingService } from '../../core/services/caching.service';
import { Button } from 'primeng/button';
import { DatePipe, JsonPipe } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-cache-dashboard',
  imports: [Button, DatePipe, JsonPipe, TableModule],
  templateUrl: './cache-dashboard.html',
  styleUrl: './cache-dashboard.scss',
})
export class CacheDashboard {
  cacheService = inject(CachingService);

  isExpanded = signal(false);

  expand() {
    this.isExpanded.set(!this.isExpanded());
  }
}
