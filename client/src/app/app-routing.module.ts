import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { BooksComponent } from './pages/books/books.component';
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'courses/:titulo',component:CoursesComponent},
  {path:'subjects/:ensenanza/:curso', component:SubjectsComponent},
  {path:'books/:asignaturas', component:BooksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
