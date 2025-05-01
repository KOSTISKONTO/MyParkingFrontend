import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParkingsComponent } from './admin-parkings.component';

describe('AdminParkingsComponent', () => {
  let component: AdminParkingsComponent;
  let fixture: ComponentFixture<AdminParkingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminParkingsComponent]
    });
    fixture = TestBed.createComponent(AdminParkingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
