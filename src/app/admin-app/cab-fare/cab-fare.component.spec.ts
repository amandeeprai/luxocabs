import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabFareComponent } from './cab-fare.component';

describe('CabFareComponent', () => {
  let component: CabFareComponent;
  let fixture: ComponentFixture<CabFareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabFareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabFareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
