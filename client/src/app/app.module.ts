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
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { CatSubjectsComponent } from './components/cat-subjects/cat-subjects.component';
import { BooksComponent } from './pages/books/books.component';
import { DetailsComponent } from './pages/details/details.component';
import { CatDetailsComponent } from './components/cat-details/cat-details.component';
import { FilterCoursesComponent } from './components/filter-courses/filter-courses.component';
import { SearchComponentPage } from './pages/search/search.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterCatComponent } from './components/register-cat/register-cat.component';
import { LoginCatComponent } from './components/login-cat/login-cat.component';
import { ShowUserDirective } from './directive/show-user.directive';
import { HttpTokenInterceptor } from './interceptors';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FavButtonComponent } from './components/favorite/fav-button/fav-button.component';
import { FollowButtonComponent } from './components/follow/follow-button/follow-button.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileCatComponent } from './components/profile-cat/profile-cat.component';

@NgModule({
  declarations: [
    AppComponent,
    categoriesComponent,
    NavBarComponent,
    HomeComponent,
    SearchComponent,
    CoursesComponent,
    SubjectsComponent,
    CatSubjectsComponent,
    BooksComponent,
    DetailsComponent,
    CatDetailsComponent,
    FilterCoursesComponent,
    SearchComponentPage,
    LoginComponent,
    RegisterComponent,
    RegisterCatComponent,
    LoginCatComponent,
    ShowUserDirective,
    ProfileComponent,
    // ProfileCatComponent,
    // FollowButtonComponent,
    // FavButtonComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
