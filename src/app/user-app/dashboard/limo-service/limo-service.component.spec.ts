import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimoServiceComponent } from './limo-service.component';

describe('LimoServiceComponent', () => {
  let component: LimoServiceComponent;
  let fixture: ComponentFixture<LimoServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimoServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimoServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
