import { Component, OnInit, signal } from '@angular/core';
import { Select } from 'primeng/select';
import { AssistantService } from '../../assistant/service/assistant.service';
import { VapiCallBtn } from '../../vapi/vapi-call-btn/vapi-call-btn';
import { IAssistant } from '../../assistant/model/assistant.model';
import { FormsModule } from '@angular/forms';
import { SEOService } from '../../../services/seo.service';
import { IResponseData } from '../../../core/response/response-data';
import { CommonService } from '../../../services/common-service';
@Component({
  selector: 'app-homepage',
  imports: [VapiCallBtn, Select, FormsModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage implements OnInit {
  assistants = signal<IAssistant[]>([]);
  selectedAssistant = signal<string | undefined>(undefined);

  constructor(
    public assistantService: AssistantService,
    private seoService: SEOService,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    // Set SEO meta tags for homepage
    this.seoService.updateSEO(this.seoService.getHomepageSEO());

    if (!this.commonService.isBrowser) return;
    this.assistantService
      .getAll()
      .subscribe((data: IResponseData<IAssistant>) => {
        this.assistants.set(data.dataList);
      });
  }
}
