import { Injectable } from '@angular/core';
import Vapi from '@vapi-ai/web';

@Injectable({
  providedIn: 'root',
})
export class VapiService {
  vapi = new Vapi('4ec964d5-76fb-4649-a1ed-0592eab73a53');
}
