import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FleetsComponent } from './fleets.component';
import { Routes, RouterModule } from '@angular/router';
import { CardsModule } from '../../../mdb-components/pro/index';
const routes: Routes = [
  { 
    path: '', 
    component: FleetsComponent
  }]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardsModule
  ],
  declarations: [FleetsComponent]
})
export class FleetsModule { }
