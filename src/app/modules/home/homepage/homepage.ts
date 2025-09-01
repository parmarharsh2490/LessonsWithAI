import { Component, OnInit, signal } from '@angular/core';
import { Select } from 'primeng/select';
import { AssistantService } from '../../assistant/service/assistant.service';
import { VapiCallBtn } from '../../vapi/vapi-call-btn/vapi-call-btn';
import { IAssistantList } from '../../assistant/model/assistant.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  imports: [VapiCallBtn, Select, FormsModule],
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
