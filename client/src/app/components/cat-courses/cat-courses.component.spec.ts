import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatCoursesComponent } from './cat-courses.component';

describe('CatCoursesComponent', () => {
  let component: CatCoursesComponent;
  let fixture: ComponentFixture<CatCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
