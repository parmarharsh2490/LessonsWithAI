import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { SEOConfigService } from './services/seo-config.service';
import { CommonService } from './services/common-service';
// import {
//   KeycloakDataService,
//   KeycloakDataServiceProvider,
// } from './utils/keycloak-data.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  // providers: [KeycloakDataServiceProvider],
  providers: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  constructor(
    private seoConfigService: SEOConfigService,
    private commonService: CommonService,
    // private injector: Injector,
  ) {}

  ngOnInit(): void {
    // Initialize global SEO configuration
    if (this.commonService.isBrowser) {
      this.seoConfigService.initializeGlobalSEO();
      this.seoConfigService.addOrganizationStructuredData();
      this.seoConfigService.addWebsiteStructuredData();
      this.seoConfigService.addSoftwareApplicationStructuredData();
    }
    if (!this.commonService.isBrowser || typeof window === 'undefined') return;
    // const keycloakDataService = this.injector.get(KeycloakDataService);
    // keycloakDataService.setUserData();
  }
}
