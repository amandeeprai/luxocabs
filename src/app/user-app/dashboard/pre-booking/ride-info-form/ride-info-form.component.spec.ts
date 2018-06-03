import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideInfoFormComponent } from './ride-info-form.component';

describe('RideInfoFormComponent', () => {
  let component: RideInfoFormComponent;
  let fixture: ComponentFixture<RideInfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideInfoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
