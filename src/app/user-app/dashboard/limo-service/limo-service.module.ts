import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimoServiceComponent } from './limo-service.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { 
    path: '', 
    component: LimoServiceComponent
  }]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LimoServiceComponent]
})
export class LimoServiceModule { }

