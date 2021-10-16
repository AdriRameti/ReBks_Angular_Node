import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { categoriesComponent } from './components/categories/categories.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { CoursesComponent } from './pages/courses/courses.component';
import { CatCoursesComponent } from './components/cat-courses/cat-courses.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { CatSubjectsComponent } from './components/cat-subjects/cat-subjects.component';
import { BooksComponent } from './pages/books/books.component';
import { CatBooksComponent } from './components/cat-books/cat-books.component';
import { DetailsComponent } from './pages/details/details.component';
import { CatDetailsComponent } from './components/cat-details/cat-details.component';
import { AllBooksComponent } from './components/cat-books/all-books.component';
import { AllCoursesComponent } from './components/cat-courses/all-courses.component';
import { FilterCoursesComponent } from './components/filter-courses/filter-courses.component';
import { SearchComponentPage } from './pages/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    categoriesComponent,
    NavBarComponent,
    HomeComponent,
    SearchComponent,
    CoursesComponent,
    // CatCoursesComponent,
    SubjectsComponent,
    CatSubjectsComponent,
    BooksComponent,
    // CatBooksComponent,
    DetailsComponent,
    CatDetailsComponent,
    FilterCoursesComponent,
    // AllCoursesComponent,
    // AllBooksComponent
    SearchComponentPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
