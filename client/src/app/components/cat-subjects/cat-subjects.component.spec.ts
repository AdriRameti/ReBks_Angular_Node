import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatSubjectsComponent } from './cat-subjects.component';

describe('CatSubjectsComponent', () => {
  let component: CatSubjectsComponent;
  let fixture: ComponentFixture<CatSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatSubjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
