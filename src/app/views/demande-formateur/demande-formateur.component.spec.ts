import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFormateurComponent } from './demande-formateur.component';

describe('DemandeFormateurComponent', () => {
  let component: DemandeFormateurComponent;
  let fixture: ComponentFixture<DemandeFormateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeFormateurComponent]
    });
    fixture = TestBed.createComponent(DemandeFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
