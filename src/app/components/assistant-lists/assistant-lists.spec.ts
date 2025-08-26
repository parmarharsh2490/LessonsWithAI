import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantLists } from './assistant-lists';

describe('AssistantLists', () => {
  let component: AssistantLists;
  let fixture: ComponentFixture<AssistantLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistantLists],
    }).compileComponents();

    fixture = TestBed.createComponent(AssistantLists);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
