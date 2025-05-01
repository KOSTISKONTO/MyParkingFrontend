import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingbyAddressSearchComponent } from './bookingby-address-search.component';

describe('BookingbyAddressSearchComponent', () => {
  let component: BookingbyAddressSearchComponent;
  let fixture: ComponentFixture<BookingbyAddressSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingbyAddressSearchComponent]
    });
    fixture = TestBed.createComponent(BookingbyAddressSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
