import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificationFormateurComponent } from './planification-formateur.component';

describe('PlanificationFormateurComponent', () => {
  let component: PlanificationFormateurComponent;
  let fixture: ComponentFixture<PlanificationFormateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanificationFormateurComponent]
    });
    fixture = TestBed.createComponent(PlanificationFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
