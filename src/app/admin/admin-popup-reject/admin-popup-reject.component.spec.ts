import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPopupRejectComponent } from './admin-popup-reject.component';

describe('AdminPopupRejectComponent', () => {
  let component: AdminPopupRejectComponent;
  let fixture: ComponentFixture<AdminPopupRejectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPopupRejectComponent]
    });
    fixture = TestBed.createComponent(AdminPopupRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
