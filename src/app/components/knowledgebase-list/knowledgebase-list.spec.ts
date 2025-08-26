import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgebaseList } from './knowledgebase-list';

describe('KnowledgebaseList', () => {
  let component: KnowledgebaseList;
  let fixture: ComponentFixture<KnowledgebaseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowledgebaseList],
    }).compileComponents();

    fixture = TestBed.createComponent(KnowledgebaseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
