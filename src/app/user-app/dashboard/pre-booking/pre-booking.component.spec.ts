import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBookingComponent } from './pre-booking.component';

describe('PreBookingComponent', () => {
  let component: PreBookingComponent;
  let fixture: ComponentFixture<PreBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
