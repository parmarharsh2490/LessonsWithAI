import { Component } from '@angular/core';
import { VapiService } from '../../services/vapi.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-vapi-call-btn',
  imports: [ButtonModule],
  templateUrl: './vapi-call-btn.html',
  styleUrl: './vapi-call-btn.scss',
})
export class VapiCallBtn {
  constructor(private vapiService: VapiService) {}
  startCall() {
    this.vapiService.vapi.start('c2eb75ed-069d-4e22-9219-64922608fe07');
  }
}
