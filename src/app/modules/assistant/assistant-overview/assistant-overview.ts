import {
  Component,
  createComponent,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
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
import { Select, SelectChangeEvent } from 'primeng/select';
import { IModel } from '../model/model.model';
import { IAssistant } from '../model/assistant.model';
import { CommonList } from '../../../core/common-list/common-list';
import { toSignal } from '../../../core/base/safe-signal';

@Component({
  selector: 'app-assistant-overview',
  imports: [Input, ReactiveFormsModule, Select, FormsModule],
  templateUrl: './assistant-overview.html',
  styleUrl: './assistant-overview.scss',
})
export class AssistantOverview implements OnInit {
  assistant = input<IAssistant | undefined>(undefined);
  private commonList = inject(CommonList);
  onAssistantChange = output<IAssistant>();
  modelList = toSignal<IModel>(this.commonList.getModels());
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
    this.formData().patchValue({
      name: this.assistant()?.name,
    });
    this.formData()
      .get('name')
      ?.valueChanges.subscribe((value) => {
        this.onAssistantChange.emit({
          ...this.assistant()!,
          name: value,
        });
      });
  }
  async openVoiceModal() {
    const VoiceDialog = await import('../voice-dialog/voice-dialog').then(
      (m) => m.VoiceDialog,
    );
    this.lazyLoadComponentService.componentRef = createComponent(VoiceDialog, {
      environmentInjector: this.lazyLoadComponentService.injector,
    });
    this.lazyLoadComponentService.componentRef.instance.onSubmit.subscribe(
      (data) => {
        let assistant = this.assistant()!;
        assistant.voice = data;
        this.onAssistantChange.emit(assistant);
        this.lazyLoadComponentService.componentRef?.destroy();
      },
    );
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

  assistantModelChange(event: SelectChangeEvent) {
    this.onAssistantChange.emit({
      ...this.assistant()!,
      model: event.value,
    });
  }
}
