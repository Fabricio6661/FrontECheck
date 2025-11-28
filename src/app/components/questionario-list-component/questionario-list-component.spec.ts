import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionarioListComponent } from './questionario-list-component';

describe('QuestionarioListComponent', () => {
  let component: QuestionarioListComponent;
  let fixture: ComponentFixture<QuestionarioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionarioListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
