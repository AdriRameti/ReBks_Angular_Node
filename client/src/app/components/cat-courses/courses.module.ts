import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { AllCoursesComponent } from './all-courses.component';
import { CatCoursesComponent } from './cat-courses.component';
@NgModule({
  declarations: [
    AllCoursesComponent,
    CatCoursesComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
