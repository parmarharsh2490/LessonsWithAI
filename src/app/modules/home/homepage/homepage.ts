import { Component, inject, OnInit } from '@angular/core';
import { Select } from 'primeng/select';
import { AssistantService } from '../../assistant/service/assistant.service';
import { VapiCallBtn } from '../../vapi/vapi-call-btn/vapi-call-btn';
import { FormsModule } from '@angular/forms';
import { SEOService } from '../../../services/seo.service';
import { VapiService } from '../../vapi/service/vapi.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { VapiChatBtn } from '../../vapi/vapi-chat-btn/vapi-chat-btn';
import { toDataList } from '../../../core/base/signal-wrapper';
@Component({
  imports: [VapiCallBtn, Select, FormsModule, VapiChatBtn],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage implements OnInit {
  private assistantService = inject(AssistantService);
  assistants = toSignal(toDataList(this.assistantService.getAll()));

  constructor(
    private seoService: SEOService,
    public vapiService: VapiService,
  ) {}

  ngOnInit(): void {
    // Set SEO meta tags for homepage
    this.seoService.updateSEO(this.seoService.getHomepageSEO());
  }
}
