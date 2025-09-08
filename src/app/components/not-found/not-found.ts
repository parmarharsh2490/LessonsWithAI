import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [Button, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound implements OnInit {
  constructor(private seoService: SEOService) {}

  ngOnInit(): void {
    // Set SEO meta tags for 404 page
    this.seoService.updateSEO(this.seoService.getNotFoundSEO());
  }
}
