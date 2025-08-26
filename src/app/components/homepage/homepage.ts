import { Component, signal } from '@angular/core';
import { VapiCallBtn } from '../vapi-call-btn/vapi-call-btn';

@Component({
  selector: 'app-homepage',
  imports: [VapiCallBtn],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage {
  protected readonly title = signal('Learn.AI');
}
