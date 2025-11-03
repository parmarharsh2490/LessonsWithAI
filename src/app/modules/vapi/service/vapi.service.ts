import { Injectable, signal } from '@angular/core';
import Vapi from '@vapi-ai/web';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class VapiService {
  status = signal<'PROCESSING' | 'ENDED'>('ENDED');
  vapi = new Vapi(environment.vapiPublicKey);
  selectedAssistant = signal<string | undefined>(undefined);
  showChatBot = signal(true);

  constructor() {
    this.vapi.on('call-start', () => {
      this.status.set('PROCESSING');
    });
    this.vapi.on('call-end', () => {
      this.status.set('ENDED');
    });
  }

  startCall() {
    this.vapi.start(this.selectedAssistant());
  }

  endCall() {
    this.vapi.stop();
  }
}
