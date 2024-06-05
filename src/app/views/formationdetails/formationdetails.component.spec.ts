import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationdetailsComponent } from './formationdetails.component';

describe('FormationdetailsComponent', () => {
  let component: FormationdetailsComponent;
  let fixture: ComponentFixture<FormationdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormationdetailsComponent]
    });
    fixture = TestBed.createComponent(FormationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
