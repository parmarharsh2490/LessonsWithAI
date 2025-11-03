import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CallService } from '../service/call.service';
import { ICallReport } from '../model/call.model';
import { Dialog } from 'primeng/dialog';
import { DatePipe } from '@angular/common';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { Button } from 'primeng/button';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-call-report',
  imports: [Dialog, DatePipe, Tabs, Tab, TabPanel, TabPanels, TabList, Button],
  templateUrl: './call-report.html',
  styleUrl: './call-report.scss',
})
export class CallReport implements OnInit {
  private callService = inject(CallService);
  callId = input.required<string>();
  callReport = signal<ICallReport | null>(null);
  visible = signal<boolean>(true);

  handleHide() {
    this.visible.set(false);
  }

  async ngOnInit(): Promise<void> {
    this.callReport.set(
      (await firstValueFrom(this.callService.getById(this.callId()!))).data,
    );
  }

  getCallDuration(): string {
    const report = this.callReport();
    if (report) {
      const start = new Date(report.startedAt);
      const end = new Date(report.endedAt);
      const durationMs = end.getTime() - start.getTime();
      const seconds = Math.floor(durationMs / 1000);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return '0:00';
  }

  downloadTranscript(): void {
    const report = this.callReport();
    if (report?.transcript) {
      const blob = new Blob([report.transcript], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `transcript-${report.id}.txt`;
      link.click();
      window.URL.revokeObjectURL(url);
    }
  }
}
