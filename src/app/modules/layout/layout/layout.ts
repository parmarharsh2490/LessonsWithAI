import { Component, inject } from '@angular/core';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from '../../../core/services/loading.service';
import { ProgressSpinner } from 'primeng/progressspinner';
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Sidebar, ProgressSpinner],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  loadingService = inject(LoadingService);
}
