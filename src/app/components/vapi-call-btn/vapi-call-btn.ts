import { Component, input } from '@angular/core';
import { VapiService } from '../../services/vapi.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-vapi-call-btn',
  imports: [ButtonModule],
  templateUrl: './vapi-call-btn.html',
  styleUrl: './vapi-call-btn.scss',
})
export class VapiCallBtn {
  assistantId = input<string | undefined>(undefined);
  constructor(private vapiService: VapiService) {}
  startCall() {
    this.vapiService.vapi.start(this.assistantId());
  }
}
