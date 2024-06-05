import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainSessionComponent } from './train-session.component';

describe('TrainSessionComponent', () => {
  let component: TrainSessionComponent;
  let fixture: ComponentFixture<TrainSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainSessionComponent]
    });
    fixture = TestBed.createComponent(TrainSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
