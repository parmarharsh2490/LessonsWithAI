import {
  Component,
  computed,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { IVoice } from '../model/voice.model';
import { Dialog } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { toSignal } from '../../../core/base/safe-signal';
import { CommonList } from '../../../core/common-list/common-list';

@Component({
  selector: 'app-voice-dialog',
  imports: [Dialog, FormsModule, Select, InputText, Button],
  templateUrl: './voice-dialog.html',
  styleUrl: './voice-dialog.scss',
})
export class VoiceDialog implements OnInit {
  private commonList = inject(CommonList);
  onSubmit = output<IVoice>();
  genders = signal<string[]>([]);
  accents = signal<string[]>([]);
  tones = signal<string[]>([]);
  selectedGender = signal<string>('All');
  selectedAccent = signal<string>('All');
  selectedTone = signal<string>('All');
  searchTerm = signal<string>('');
  selectedVoice = signal<IVoice | undefined>(undefined);
  visible = signal<boolean>(true);
  onHide = output<void>();
  voices = toSignal<IVoice>(this.commonList.getVoices());
  filteredvoices = computed(() => {
    return this.voices().filter((voice: IVoice) => {
      let flag = true;
      if (this.selectedGender() !== 'All') {
        flag = voice.gender === this.selectedGender();
      }
      if (this.selectedAccent() !== 'All') {
        flag = flag && voice.accent === this.selectedAccent();
      }
      if (this.selectedTone() !== 'All') {
        flag = flag && voice.tone === this.selectedTone();
      }
      if (this.searchTerm().length > 0) {
        flag =
          flag &&
          (voice.name.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
            voice.accent
              .toLowerCase()
              .includes(this.searchTerm().toLowerCase()) ||
            voice.tone
              .toLowerCase()
              .includes(this.searchTerm().toLowerCase()) ||
            voice.gender
              .toLowerCase()
              .includes(this.searchTerm().toLowerCase()));
      }
      return flag;
    });
  });

  ngOnInit(): void {
    this.genders.set(
      Array.from([
        'All',
        ...new Set(this.voices().map((voice) => voice.gender)),
      ]),
    );
    this.accents.set(
      Array.from([
        'All',
        ...new Set(this.voices().map((voice) => voice.accent)),
      ]),
    );
    this.tones.set(
      Array.from(['All', ...new Set(this.voices().map((voice) => voice.tone))]),
    );
  }

  submit() {
    this.onSubmit.emit(this.selectedVoice()!);
  }

  onCancel() {
    this.onHide.emit();
  }
}
