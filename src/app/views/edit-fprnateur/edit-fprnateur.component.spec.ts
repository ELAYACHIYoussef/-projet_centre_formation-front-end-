import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFprnateurComponent } from './edit-fprnateur.component';

describe('EditFprnateurComponent', () => {
  let component: EditFprnateurComponent;
  let fixture: ComponentFixture<EditFprnateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFprnateurComponent]
    });
    fixture = TestBed.createComponent(EditFprnateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
