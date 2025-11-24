import { Component, inject, OnInit, signal } from '@angular/core';
import { CachingService } from '../../core/services/caching.service';
import { Button } from 'primeng/button';
import { DatePipe, JsonPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CommonService } from '../../services/common-service';

@Component({
  selector: 'app-cache-dashboard',
  imports: [Button, DatePipe, JsonPipe, TableModule],
  templateUrl: './cache-dashboard.html',
  styleUrl: './cache-dashboard.scss',
})
export class CacheDashboard implements OnInit {
  cacheService = inject(CachingService);
  commonService = inject(CommonService);

  isExpanded = signal(false);
  showCacheDashboard = signal(false);

  expand() {
    this.isExpanded.set(!this.isExpanded());
  }

  ngOnInit(): void {
    if (!this.commonService.isBrowser) return;
    window.addEventListener('showCacheDashboard', () => {
      this.showCacheDashboard.set(
        localStorage.getItem('showCacheDashboard') === 'true',
      );
    });
  }
}
