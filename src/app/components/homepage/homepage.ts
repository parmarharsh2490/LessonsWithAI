import { Component, signal } from '@angular/core';
import { VapiCallBtn } from '../vapi-call-btn/vapi-call-btn';
import { SelectModule } from 'primeng/select';
import { AssistantService } from '../../services/assistant.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  imports: [VapiCallBtn, SelectModule, AsyncPipe, CommonModule, FormsModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage {
  protected readonly title = signal('Learn.AI');
  selectedAssistant = signal<string | undefined>(undefined);
  constructor(public assistantService: AssistantService) {}
}
