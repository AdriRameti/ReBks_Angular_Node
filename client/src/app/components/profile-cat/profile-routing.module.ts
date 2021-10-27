import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule, Router } from '@angular/router';
import { ProfileCatComponent } from './profile-cat.component';
import { UserGuardsService } from 'src/app/services/user-guards.service';

const routes: Routes = [
  {
    path:'',
    component:ProfileCatComponent,
    canActivate:[UserGuardsService]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ProfileRoutingModule { }
