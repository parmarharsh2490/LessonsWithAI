import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { SEOConfigService } from './services/seo-config.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  constructor(private seoConfigService: SEOConfigService) {}

  ngOnInit(): void {
    // Initialize global SEO configuration
    this.seoConfigService.initializeGlobalSEO();
    this.seoConfigService.addOrganizationStructuredData();
    this.seoConfigService.addWebsiteStructuredData();
    this.seoConfigService.addSoftwareApplicationStructuredData();
  }
}
