import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCatComponent } from './login-cat.component';

describe('LoginCatComponent', () => {
  let component: LoginCatComponent;
  let fixture: ComponentFixture<LoginCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
