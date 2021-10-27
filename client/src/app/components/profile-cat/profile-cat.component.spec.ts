import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCatComponent } from './profile-cat.component';

describe('ProfileCatComponent', () => {
  let component: ProfileCatComponent;
  let fixture: ComponentFixture<ProfileCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
