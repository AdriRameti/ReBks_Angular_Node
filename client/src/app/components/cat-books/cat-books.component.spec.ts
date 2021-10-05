import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatBooksComponent } from './cat-books.component';

describe('CatBooksComponent', () => {
  let component: CatBooksComponent;
  let fixture: ComponentFixture<CatBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
