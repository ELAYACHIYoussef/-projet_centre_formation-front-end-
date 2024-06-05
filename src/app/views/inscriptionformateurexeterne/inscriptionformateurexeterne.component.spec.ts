import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionformateurexeterneComponent } from './inscriptionformateurexeterne.component';

describe('InscriptionformateurexeterneComponent', () => {
  let component: InscriptionformateurexeterneComponent;
  let fixture: ComponentFixture<InscriptionformateurexeterneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscriptionformateurexeterneComponent]
    });
    fixture = TestBed.createComponent(InscriptionformateurexeterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
