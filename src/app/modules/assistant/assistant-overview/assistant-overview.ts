import {
  Component,
  createComponent,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { IAssistant } from '../model/assistant.model';
import { AssistantVoiceNamePipe } from '../pipe/assistant-voice-name-pipe';
import { LazyLoadComponentService } from '../../../services/lazy load/lazyload-component.service';
import { VoiceDialog } from '../voice-dialog/voice-dialog';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Input } from '../../../components/ui/input/input';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { MODELS } from '../constant/model';
import { IModel } from '../model/model.model';

@Component({
  selector: 'app-assistant-overview',
  imports: [
    AssistantVoiceNamePipe,
    Input,
    ReactiveFormsModule,
    Button,
    Select,
    FormsModule,
  ],
  templateUrl: './assistant-overview.html',
  styleUrl: './assistant-overview.scss',
})
export class AssistantOverview implements OnInit {
  assistant = input.required<IAssistant>();
  updateAssistant = output<IAssistant>();
  modelList = signal<IModel[]>(MODELS);
  formData = signal<FormGroup>(
    new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
    }),
  );
  constructor(
    private lazyLoadComponentService: LazyLoadComponentService<VoiceDialog>,
  ) {}

  ngOnInit(): void {
    // this.openVoiceModal();
  }
  async openVoiceModal() {
    const VoiceDialog = await import('../voice-dialog/voice-dialog').then(
      (m) => m.VoiceDialog,
    );
    this.lazyLoadComponentService.componentRef = createComponent(VoiceDialog, {
      environmentInjector: this.lazyLoadComponentService.injector,
    });
    this.lazyLoadComponentService.componentRef.instance.onHide.subscribe(() => {
      this.lazyLoadComponentService.componentRef?.destroy();
    });
    this.lazyLoadComponentService.applicationRef.attachView(
      this.lazyLoadComponentService.componentRef.hostView,
    );
    document.body.appendChild(
      this.lazyLoadComponentService.componentRef.location.nativeElement,
    );
  }

  assistantModelChange(event: IModel['id']) {
    this.updateAssistant.emit({
      ...this.assistant(),
      model: {
        ...this.assistant()?.model,
        model: event,
      },
    });
  }
}
