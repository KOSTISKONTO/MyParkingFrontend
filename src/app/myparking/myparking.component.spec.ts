import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyparkingComponent } from './myparking.component';

describe('MyparkingComponent', () => {
  let component: MyparkingComponent;
  let fixture: ComponentFixture<MyparkingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyparkingComponent]
    });
    fixture = TestBed.createComponent(MyparkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
