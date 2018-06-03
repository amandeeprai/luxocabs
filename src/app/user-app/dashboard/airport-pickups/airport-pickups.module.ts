import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirportPickupsComponent } from './airport-pickups.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { 
    path: '', 
    component: AirportPickupsComponent
  }]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AirportPickupsComponent]
})
export class AirportPickupsModule { }
