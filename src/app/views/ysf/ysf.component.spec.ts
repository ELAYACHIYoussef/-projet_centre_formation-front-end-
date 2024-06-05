import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YsfComponent } from './ysf.component';

describe('YsfComponent', () => {
  let component: YsfComponent;
  let fixture: ComponentFixture<YsfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YsfComponent]
    });
    fixture = TestBed.createComponent(YsfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
