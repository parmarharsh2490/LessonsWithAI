import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VapiChatBtn } from './vapi-chat-btn';

describe('VapiChatBtn', () => {
  let component: VapiChatBtn;
  let fixture: ComponentFixture<VapiChatBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VapiChatBtn],
    }).compileComponents();

    fixture = TestBed.createComponent(VapiChatBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
