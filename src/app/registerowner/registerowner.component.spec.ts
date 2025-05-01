import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterownerComponent } from './registerowner.component';

describe('RegisterownerComponent', () => {
  let component: RegisterownerComponent;
  let fixture: ComponentFixture<RegisterownerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterownerComponent]
    });
    fixture = TestBed.createComponent(RegisterownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
