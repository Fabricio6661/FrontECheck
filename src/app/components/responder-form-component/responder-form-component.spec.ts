import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderFormularioComponent } from "./responder-form-component";


describe('ResponderFormComponent', () => {
  let component: ResponderFormularioComponent;
  let fixture: ComponentFixture<ResponderFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponderFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponderFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
