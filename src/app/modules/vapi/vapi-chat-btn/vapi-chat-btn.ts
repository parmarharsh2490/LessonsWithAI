import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonService } from '../../../services/common-service';

@Component({
  selector: 'app-vapi-chat-btn',
  imports: [ButtonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './vapi-chat-btn.html',
  styleUrl: './vapi-chat-btn.scss',
})
export class VapiChatBtn implements OnInit {
  constructor(public commonService: CommonService) {}
  ngOnInit(): void {
    if (this.commonService.isBrowser) {
      const script = document.createElement('script');
      script.src =
        'https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js';
      script.async = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }
  }
}
