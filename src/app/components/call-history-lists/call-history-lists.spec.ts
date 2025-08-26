import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallHistoryLists } from './call-history-lists';

describe('CallHistoryLists', () => {
  let component: CallHistoryLists;
  let fixture: ComponentFixture<CallHistoryLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallHistoryLists],
    }).compileComponents();

    fixture = TestBed.createComponent(CallHistoryLists);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
