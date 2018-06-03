import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeElementComponent } from './stripe-element.component';

describe('StripeElementComponent', () => {
  let component: StripeElementComponent;
  let fixture: ComponentFixture<StripeElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
