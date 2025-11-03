import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { VapiService } from '../service/vapi.service';

@Component({
  selector: 'app-vapi-call-btn',
  imports: [Button],
  templateUrl: './vapi-call-btn.html',
  styleUrl: './vapi-call-btn.scss',
})
export class VapiCallBtn {
  constructor(public vapiService: VapiService) {}
  startCall() {
    if (this.vapiService.status() === 'PROCESSING') {
      this.vapiService.endCall();
    } else {
      this.vapiService.startCall();
    }
  }
}
