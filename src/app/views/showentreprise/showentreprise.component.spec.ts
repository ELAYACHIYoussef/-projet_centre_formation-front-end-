import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowentrepriseComponent } from './showentreprise.component';

describe('ShowentrepriseComponent', () => {
  let component: ShowentrepriseComponent;
  let fixture: ComponentFixture<ShowentrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowentrepriseComponent]
    });
    fixture = TestBed.createComponent(ShowentrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
