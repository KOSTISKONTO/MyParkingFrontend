import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewParkingComponent } from './new-parking.component';

describe('NewParkingComponent', () => {
  let component: NewParkingComponent;
  let fixture: ComponentFixture<NewParkingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewParkingComponent]
    });
    fixture = TestBed.createComponent(NewParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
