import { Component, OnDestroy, OnInit, output } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-assistant-details',
  imports: [TabsModule, RouterLink, DialogModule],
  templateUrl: './assistant-details.html',
  styleUrl: './assistant-details.scss',
})
export class AssistantDetails implements OnInit, OnDestroy {
  onAssistantDetailsPopupHide = output<void>();
  visible = true;

  constructor() {}

  ngOnInit(): void {
    alert('Assistant Details Init');
  }

  ngOnDestroy(): void {
    alert('Assistant Details Destroy');
  }

  tabs = [
    {
      label: 'Overview',
      route: '/assistant/overview',
      icon: 'pi pi-home',
    },
  ];
  onHide() {
    console.log('onHide - Dialog is closing');
    this.visible = false;
    this.onAssistantDetailsPopupHide.emit();
  }
}
