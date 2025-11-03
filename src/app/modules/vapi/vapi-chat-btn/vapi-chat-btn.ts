import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonService } from '../../../services/common-service';
import { environment } from '../../../../environment/environment';
import { VapiService } from '../service/vapi.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { MessageService } from '../../../services/message.service';
@Component({
  selector: 'app-vapi-chat-btn',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './vapi-chat-btn.html',
  styleUrl: './vapi-chat-btn.scss',
})
export class VapiChatBtn implements AfterViewInit {
  vapiPublicKey = environment.vapiPublicKey;
  public vapiService = inject(VapiService);
  private commonService = inject(CommonService);
  private messageService = inject(MessageService);
  private el = inject(ElementRef);

  constructor() {
    if (this.commonService.isBrowser) {
      sessionStorage.setItem('vapi_widget_expanded', 'false');
    }
    toObservable(this.vapiService.selectedAssistant).subscribe(
      (data: string | undefined) => {
        const widget: HTMLElement | null =
          this.el.nativeElement.querySelector('vapi-widget');
        if (widget && this.commonService.isBrowser) {
          widget.setAttribute('public-key', this.vapiPublicKey);
          widget.setAttribute('assistant-id', data || '');
          const script = document.createElement('script');
          script.src =
            'https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js';
          script.async = true;
          script.type = 'text/javascript';
          document.body.appendChild(script);
        }
      },
    );
  }

  ngAfterViewInit(): void {
    if (this.commonService.isBrowser) {
      const widget = document.getElementById('vapiWidget');
      widget?.addEventListener('click', (event: Event) => {
        if (!this.vapiService.selectedAssistant()) {
          this.messageService.showWarnToast('Please select an assistant first');
          event.stopImmediatePropagation();
        }
      });
    }
  }
}
