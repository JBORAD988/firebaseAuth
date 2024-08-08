import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewforgotpassComponent } from './newforgotpass.component';

describe('NewforgotpassComponent', () => {
  let component: NewforgotpassComponent;
  let fixture: ComponentFixture<NewforgotpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewforgotpassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewforgotpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
