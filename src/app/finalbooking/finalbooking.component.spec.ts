import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalbookingComponent } from './finalbooking.component';

describe('FinalbookingComponent', () => {
  let component: FinalbookingComponent;
  let fixture: ComponentFixture<FinalbookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalbookingComponent]
    });
    fixture = TestBed.createComponent(FinalbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
