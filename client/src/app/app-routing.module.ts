import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { DetailsComponent } from './pages/details/details.component';
import { SearchComponentPage } from './pages/search/search.component';
import { LoginComponent } from './pages/login/login.component';
const routes: Routes = [
  {path:'',component:HomeComponent},
  {
    path:'courses',
    loadChildren: () => import('./components/cat-courses/courses.module').then(m => m.CoursesModule)
  },
  {path:'subjects/:ensenanza/:curso', component:SubjectsComponent},
  {
    path: 'books',
    loadChildren: () => import('./components/cat-books/books.module').then(m => m.BooksModule)
  },
  {path:'details/:slug', component:DetailsComponent},
  {path:'search',component:SearchComponentPage},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
