import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VapiCallBtn } from './vapi-call-btn';

describe('VapiCallBtn', () => {
  let component: VapiCallBtn;
  let fixture: ComponentFixture<VapiCallBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VapiCallBtn],
    }).compileComponents();

    fixture = TestBed.createComponent(VapiCallBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
