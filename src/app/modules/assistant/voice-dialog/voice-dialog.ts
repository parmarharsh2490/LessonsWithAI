import { Component, computed, OnInit, output, signal } from '@angular/core';
import { VOICES } from '../constant/voices';
import { IVoice } from '../model/voice.model';
import { Dialog } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { AssistantDataService } from '../service/assistant-data.service';

@Component({
  selector: 'app-voice-dialog',
  imports: [Dialog, FormsModule, Select, InputText, Button],
  templateUrl: './voice-dialog.html',
  styleUrl: './voice-dialog.scss',
})
export class VoiceDialog implements OnInit {
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
  voices = computed(() => {
    return VOICES.filter((voice: IVoice) => {
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

  constructor(private assistantDataService: AssistantDataService) {}
  ngOnInit(): void {
    this.genders.set(
      Array.from(['All', ...new Set(VOICES.map((voice) => voice.gender))]),
    );
    this.accents.set(
      Array.from(['All', ...new Set(VOICES.map((voice) => voice.accent))]),
    );
    this.tones.set(
      Array.from(['All', ...new Set(VOICES.map((voice) => voice.tone))]),
    );
  }

  onSubmit() {
    this.assistantDataService.updateAssistant({
      voice: this.selectedVoice()?.id ?? '',
    });
    this.onHide.emit();
  }

  onCancel() {
    this.onHide.emit();
  }
}
