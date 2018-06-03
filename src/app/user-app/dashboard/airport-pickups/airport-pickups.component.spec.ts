import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportPickupsComponent } from './airport-pickups.component';

describe('AirportPickupsComponent', () => {
  let component: AirportPickupsComponent;
  let fixture: ComponentFixture<AirportPickupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirportPickupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportPickupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
