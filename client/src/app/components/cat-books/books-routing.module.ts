import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { CatBooksComponent } from './cat-books.component';
import { AllBooksComponent } from './all-books.component';
const routes : Routes = [

  {path:'', component:AllBooksComponent},
  {path:':asignaturas', component:CatBooksComponent}

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class BooksRoutingModule { }
