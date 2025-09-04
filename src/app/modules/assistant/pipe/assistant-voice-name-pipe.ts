import { Pipe, PipeTransform } from '@angular/core';
import { VOICES } from '../constant/voices';

@Pipe({
  name: 'assistantVoiceName',
})
export class AssistantVoiceNamePipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';
    const assistants = VOICES.find((VOICES) => VOICES.id === value);
    return assistants?.name || '';
  }
}
