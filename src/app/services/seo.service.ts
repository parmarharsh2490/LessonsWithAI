import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  robots?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterSite?: string;
  twitterCreator?: string;
  structuredData?: any;
}

@Injectable({
  providedIn: 'root',
})
export class SEOService {
  private meta = inject(Meta);
  private title = inject(Title);

  private readonly defaultData: Partial<SEOData> = {
    author: 'LessonsWithAI',
    robots: 'index, follow',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@LessonsWithAI',
    twitterCreator: '@LessonsWithAI',
  };

  updateSEO(data: SEOData): void {
    // Update title
    this.title.setTitle(data.title);

    // Basic meta tags
    this.meta.updateTag({ name: 'description', content: data.description });

    if (data.keywords) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords });
    }

    this.meta.updateTag({
      name: 'author',
      content: data.author || this.defaultData.author!,
    });
    this.meta.updateTag({
      name: 'robots',
      content: data.robots || this.defaultData.robots!,
    });

    // Canonical URL
    if (data.canonical) {
      this.meta.updateTag({ rel: 'canonical', href: data.canonical });
    }

    // Open Graph tags
    this.meta.updateTag({
      property: 'og:title',
      content: data.ogTitle || data.title,
    });
    this.meta.updateTag({
      property: 'og:description',
      content: data.ogDescription || data.description,
    });
    this.meta.updateTag({
      property: 'og:type',
      content: data.ogType || this.defaultData.ogType!,
    });

    if (data.ogImage) {
      this.meta.updateTag({ property: 'og:image', content: data.ogImage });
    }

    if (data.ogUrl) {
      this.meta.updateTag({ property: 'og:url', content: data.ogUrl });
    }

    // Twitter Card tags
    this.meta.updateTag({
      name: 'twitter:card',
      content: data.twitterCard || this.defaultData.twitterCard!,
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: data.twitterTitle || data.title,
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: data.twitterDescription || data.description,
    });

    if (data.twitterImage) {
      this.meta.updateTag({
        name: 'twitter:image',
        content: data.twitterImage,
      });
    }

    this.meta.updateTag({
      name: 'twitter:site',
      content: data.twitterSite || this.defaultData.twitterSite!,
    });
    this.meta.updateTag({
      name: 'twitter:creator',
      content: data.twitterCreator || this.defaultData.twitterCreator!,
    });

    // Structured data
    if (data.structuredData) {
      this.addStructuredData(data.structuredData);
    }
  }

  private addStructuredData(data: any): void {
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

  // Predefined SEO data for different pages
  getHomepageSEO(): SEOData {
    return {
      title:
        'LessonsWithAI-homepage - AI-Powered Learning Assistant Platform | Smart Tutoring & Education',
      description:
        "Transform your homepage learning experience with LessonsWithAI's intelligent assistants. Get personalized tutoring, instant answers, and comprehensive knowledge base management.",
      keywords:
        'AI learning,homepage artificial intelligence, education technology, smart tutoring, knowledge management, AI assistant, learning platform',
      canonical: 'https://www.lessonswithai.tech/',
      ogTitle:
        'LessonsWithAI - AI-Powered Learning Assistant Platform | Smart Tutoring & Education',
      ogDescription:
        "Transform your learning experience with LessonsWithAI's intelligent assistants. Get personalized tutoring, instant answers, and comprehensive knowledge base management.",
      ogUrl: 'https://www.lessonswithai.tech/',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'LessonsWithAI',
        description: 'AI-Powered Learning Assistant Platform',
        url: 'https://www.lessonswithai.tech/',
        potentialAction: {
          '@type': 'SearchAction',
          target:
            'https://www.lessonswithai.tech/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    };
  }

  getLoginSEO(): SEOData {
    return {
      title:
        'Sign In to LessonsWithAI | Access Your AI Learning Assistant Account',
      description:
        'Sign in to your LessonsWithAI account to access AI-powered learning assistants, personalized tutoring, and comprehensive knowledge management tools.',
      keywords:
        'login, sign in, LessonsWithAI account, AI learning platform, user authentication',
      canonical: 'https://www.lessonswithai.tech/auth/login',
      ogTitle:
        'Sign In to LessonsWithAI | Access Your AI Learning Assistant Account',
      ogDescription:
        'Sign in to your LessonsWithAI account to access AI-powered learning assistants and personalized tutoring.',
      ogImage: 'https://www.lessonswithai.tech/assets/og-login.jpg',
      ogUrl: 'https://www.lessonswithai.tech/auth/login',
    };
  }

  getRegisterSEO(): SEOData {
    return {
      title:
        'Create Account | Join LessonsWithAI - Start Your AI Learning Journey',
      description:
        'Create your LessonsWithAI account and start your AI-powered learning journey. Get access to intelligent assistants, personalized tutoring, and knowledge management tools.',
      keywords:
        'register, sign up, create account, LessonsWithAI, AI learning platform, new user',
      canonical: 'https://www.lessonswithai.tech/auth/register',
      ogTitle:
        'Create Account | Join LessonsWithAI - Start Your AI Learning Journey',
      ogDescription:
        'Create your LessonsWithAI account and start your AI-powered learning journey with intelligent assistants.',
      ogImage: 'https://www.lessonswithai.tech/assets/og-register.jpg',
      ogUrl: 'https://www.lessonswithai.tech/auth/register',
    };
  }

  getAssistantsSEO(): SEOData {
    return {
      title:
        'AI Learning Assistants | Create & Manage Your Virtual Tutors - LessonsWithAI',
      description:
        'Explore and manage your AI learning assistants. Create, customize, and deploy intelligent tutoring agents for personalized learning experiences.',
      keywords:
        'AI assistants, learning agents, intelligent tutoring, AI customization, virtual tutors, educational AI',
      canonical: 'https://www.lessonswithai.tech/assistants',
      ogTitle:
        'AI Learning Assistants | Create & Manage Your Virtual Tutors - LessonsWithAI',
      ogDescription:
        'Explore and manage your AI learning assistants for personalized tutoring experiences.',
      ogImage: 'https://www.lessonswithai.tech/assets/og-assistants.jpg',
      ogUrl: 'https://www.lessonswithai.tech/assistants',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'AI Assistants',
        description:
          'Collection of AI learning assistants for personalized education',
        url: 'https://www.lessonswithai.tech/assistants',
      },
    };
  }

  getProfileSEO(): SEOData {
    return {
      title: 'My Profile Settings | Customize Your LessonsWithAI Experience',
      description:
        'Manage your LessonsWithAI profile settings, preferences, and account information. Customize your AI learning experience.',
      keywords:
        'user profile, account settings, LessonsWithAI profile, user preferences, account management',
      canonical: 'https://www.lessonswithai.tech/profile',
      ogTitle: 'My Profile Settings | Customize Your LessonsWithAI Experience',
      ogDescription:
        'Manage your LessonsWithAI profile and customize your AI learning experience.',
      ogImage: 'https://www.lessonswithai.tech/assets/og-profile.jpg',
      ogUrl: 'https://www.lessonswithai.tech/profile',
      robots: 'noindex, nofollow', // Profile pages should not be indexed
    };
  }

  getCallHistorySEO(): SEOData {
    return {
      title:
        'Learning Session History | Track Your AI Assistant Calls - LessonsWithAI',
      description:
        'View and analyze your AI assistant call history. Track learning sessions, review conversations, and monitor your progress.',
      keywords:
        'call history, learning sessions, AI conversations, progress tracking, session analytics',
      canonical: 'https://www.lessonswithai.tech/call-history',
      ogTitle:
        'Learning Session History | Track Your AI Assistant Calls - LessonsWithAI',
      ogDescription:
        'View and analyze your AI assistant call history and learning sessions.',
      ogImage: 'https://www.lessonswithai.tech/assets/og-call-history.jpg',
      ogUrl: 'https://www.lessonswithai.tech/call-history',
      robots: 'noindex, nofollow', // User-specific data should not be indexed
    };
  }

  getKnowledgeBaseSEO(): SEOData {
    return {
      title:
        'Knowledge Base Management | Upload & Organize Educational Content - LessonsWithAI',
      description:
        'Manage your knowledge base with LessonsWithAI. Upload, organize, and maintain educational content for your AI assistants.',
      keywords:
        'knowledge base, content management, educational resources, AI training data, document management',
      canonical: 'https://www.lessonswithai.tech/knowledge-base',
      ogTitle:
        'Knowledge Base Management | Upload & Organize Educational Content - LessonsWithAI',
      ogDescription:
        'Manage your knowledge base and educational content for AI assistants.',
      ogImage: 'https://www.lessonswithai.tech/assets/og-knowledge-base.jpg',
      ogUrl: 'https://www.lessonswithai.tech/knowledge-base',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Knowledge Base',
        description: 'Educational content and knowledge management system',
        url: 'https://www.lessonswithai.tech/knowledge-base',
      },
    };
  }

  getNotFoundSEO(): SEOData {
    return {
      title: '404 Error - Page Not Found | Return to LessonsWithAI Homepage',
      description:
        'The page you are looking for could not be found. Return to LessonsWithAI homepage to continue your AI-powered learning journey.',
      keywords: '404, page not found, error, LessonsWithAI',
      canonical: 'https://www.lessonswithai.tech/404',
      ogTitle: '404 Error - Page Not Found | Return to LessonsWithAI Homepage',
      ogDescription: 'The page you are looking for could not be found.',
      ogImage: 'https://www.lessonswithai.tech/assets/og-404.jpg',
      ogUrl: 'https://www.lessonswithai.tech/404',
      robots: 'noindex, nofollow',
    };
  }
}
