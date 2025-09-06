import { Component, input, OnInit, signal } from '@angular/core';
import { CallService } from '../service/call.service';
import { ICallReport } from '../model/call.model';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-call-report',
  imports: [Dialog],
  templateUrl: './call-report.html',
  styleUrl: './call-report.scss',
})
export class CallReport implements OnInit {
  callId = input.required<string>();
  callReport = signal<ICallReport | null>(null);
  visible = signal<boolean>(true);

  constructor(private callService: CallService) {}
  ngOnInit(): void {
    this.callService
      .getCallReport(this.callId())
      .subscribe((data: ICallReport) => {
        this.callReport.set(data);
      });
  }

  handleHide() {
    this.visible.set(false);
  }
}
