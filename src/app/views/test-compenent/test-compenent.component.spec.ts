import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCompenentComponent } from './test-compenent.component';

describe('TestCompenentComponent', () => {
  let component: TestCompenentComponent;
  let fixture: ComponentFixture<TestCompenentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestCompenentComponent]
    });
    fixture = TestBed.createComponent(TestCompenentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
