import { ComponentFixture, TestBed } from '@angular/core/testing';

import { categoriesComponent } from './categories.component';

describe('categoriesComponent', () => {
  let component: categoriesComponent;
  let fixture: ComponentFixture<categoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ categoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(categoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
