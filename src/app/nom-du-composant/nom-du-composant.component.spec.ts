import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomDuComposantComponent } from './nom-du-composant.component';

describe('NomDuComposantComponent', () => {
  let component: NomDuComposantComponent;
  let fixture: ComponentFixture<NomDuComposantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NomDuComposantComponent]
    });
    fixture = TestBed.createComponent(NomDuComposantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
