import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostforgotComponent } from './ghostforgot.component';

describe('GhostforgotComponent', () => {
  let component: GhostforgotComponent;
  let fixture: ComponentFixture<GhostforgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GhostforgotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GhostforgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
