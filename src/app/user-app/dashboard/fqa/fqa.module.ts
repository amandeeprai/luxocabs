import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FqaComponent } from './fqa.component';
import { Routes, RouterModule } from '@angular/router';
import { SqueezeBoxModule } from '../../../mdb-components/pro';
const routes: Routes = [
  { 
    path: '', 
    component: FqaComponent
  }]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SqueezeBoxModule
  ],
  declarations: [FqaComponent]
})
export class FqaModule { }
