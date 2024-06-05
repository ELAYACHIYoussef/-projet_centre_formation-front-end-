import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTraineComponent } from './add-traine.component';

describe('AddTraineComponent', () => {
  let component: AddTraineComponent;
  let fixture: ComponentFixture<AddTraineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTraineComponent]
    });
    fixture = TestBed.createComponent(AddTraineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
