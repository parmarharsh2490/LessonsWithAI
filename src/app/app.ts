import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { VapiChatBtn } from './modules/vapi/vapi-chat-btn/vapi-chat-btn';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, VapiChatBtn, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
