import { Component, OnInit, signal } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { AssistantService } from '../../assistant/service/assistant.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VapiCallBtn } from '../../vapi/vapi-call-btn/vapi-call-btn';
import { IAssistantList } from '../../assistant/model/assistant.model';

@Component({
  selector: 'app-homepage',
  imports: [VapiCallBtn, SelectModule, CommonModule, FormsModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage implements OnInit {
  assistants = signal<IAssistantList[]>([]);
  selectedAssistant = signal<string | undefined>(undefined);
  constructor(public assistantService: AssistantService) {}

  ngOnInit(): void {
    this.assistantService
      .getAssistants()
      .subscribe((data: IAssistantList[]) => {
        this.assistants.set(data);
      });
  }
}
