import { Component } from '@angular/core';
import { VapiChatBtn } from '../../vapi/vapi-chat-btn/vapi-chat-btn';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Sidebar, VapiChatBtn],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
