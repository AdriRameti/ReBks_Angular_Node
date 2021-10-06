import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { AllCoursesComponent } from './all-courses.component';
import { CatCoursesComponent } from './cat-courses.component';
const routes : Routes = [

  {path:'',component:AllCoursesComponent},
  {path:':titulo',component:CatCoursesComponent}
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class CoursesRoutingModule { }
