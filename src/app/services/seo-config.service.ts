import { Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SEOConfigService {
  private meta = inject(Meta);

  // Global SEO configuration
  private readonly globalConfig = {
    siteName: 'LessonsWithAI',
    siteUrl: 'https://www.lessonswithai.tech',
    defaultImage: 'https://www.lessonswithai.tech/assets/og-default.jpg',
    twitterHandle: '@LessonsWithAI',
    author: 'LessonsWithAI Team',
    language: 'en',
    locale: 'en_US',
  };

  // Initialize global meta tags
  initializeGlobalSEO(): void {
    // Basic meta tags
    this.meta.updateTag({
      name: 'application-name',
      content: this.globalConfig.siteName,
    });
    this.meta.updateTag({
      name: 'apple-mobile-web-app-title',
      content: this.globalConfig.siteName,
    });
    this.meta.updateTag({
      name: 'msapplication-TileColor',
      content: '#2563eb',
    });
    this.meta.updateTag({ name: 'theme-color', content: '#2563eb' });

    // Language and locale
    this.meta.updateTag({
      name: 'language',
      content: this.globalConfig.language,
    });
    this.meta.updateTag({
      property: 'og:locale',
      content: this.globalConfig.locale,
    });

    // Site information
    this.meta.updateTag({
      property: 'og:site_name',
      content: this.globalConfig.siteName,
    });
    this.meta.updateTag({
      name: 'twitter:site',
      content: this.globalConfig.twitterHandle,
    });
    this.meta.updateTag({
      name: 'twitter:creator',
      content: this.globalConfig.twitterHandle,
    });

    // Performance and mobile optimization
    this.meta.updateTag({ name: 'format-detection', content: 'telephone=no' });
    this.meta.updateTag({ name: 'mobile-web-app-capable', content: 'yes' });
    this.meta.updateTag({
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    });
    this.meta.updateTag({
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default',
    });

    // Security headers
    this.meta.updateTag({
      'http-equiv': 'X-Content-Type-Options',
      content: 'nosniff',
    });
    // Note: X-Frame-Options must be set via HTTP headers, not meta tags
    this.meta.updateTag({
      'http-equiv': 'X-XSS-Protection',
      content: '1; mode=block',
    });
  }

  // Add JSON-LD structured data
  addStructuredData(data: any): void {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    script.id = 'structured-data';

    // Remove existing structured data
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);
  }

  // Organization structured data
  addOrganizationStructuredData(): void {
    const organizationData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'LessonsWithAI',
      url: this.globalConfig.siteUrl,
      logo: `${this.globalConfig.siteUrl}/assets/logo.png`,
      description: 'AI-Powered Learning Assistant Platform',
      sameAs: [
        'https://twitter.com/LessonsWithAI',
        'https://linkedin.com/company/lessonswithai',
        'https://github.com/lessonswithai',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'support@lessonswithai.tech',
      },
    };

    this.addStructuredData(organizationData);
  }

  // WebSite structured data
  addWebsiteStructuredData(): void {
    const websiteData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'LessonsWithAI',
      url: this.globalConfig.siteUrl,
      description: 'AI-Powered Learning Assistant Platform',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${this.globalConfig.siteUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };

    this.addStructuredData(websiteData);
  }

  // SoftwareApplication structured data
  addSoftwareApplicationStructuredData(): void {
    const softwareData = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'LessonsWithAI',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web Browser',
      description:
        'AI-Powered Learning Assistant Platform for personalized education',
      url: this.globalConfig.siteUrl,
      author: {
        '@type': 'Organization',
        name: 'LessonsWithAI Team',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '150',
      },
    };

    this.addStructuredData(softwareData);
  }

  // Breadcrumb structured data
  addBreadcrumbStructuredData(
    breadcrumbs: Array<{ name: string; url: string }>,
  ): void {
    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${this.globalConfig.siteUrl}${crumb.url}`,
      })),
    };

    this.addStructuredData(breadcrumbData);
  }

  // FAQ structured data
  addFAQStructuredData(
    faqs: Array<{ question: string; answer: string }>,
  ): void {
    const faqData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    this.addStructuredData(faqData);
  }

  // Get global configuration
  getGlobalConfig() {
    return this.globalConfig;
  }
}
