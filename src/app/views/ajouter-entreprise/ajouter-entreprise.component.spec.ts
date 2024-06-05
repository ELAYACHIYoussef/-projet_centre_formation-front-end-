import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEntrepriseComponent } from './ajouter-entreprise.component';

describe('AjouterEntrepriseComponent', () => {
  let component: AjouterEntrepriseComponent;
  let fixture: ComponentFixture<AjouterEntrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterEntrepriseComponent]
    });
    fixture = TestBed.createComponent(AjouterEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
