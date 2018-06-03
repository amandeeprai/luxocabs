import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes } from '@angular/router';
import { CarouselModule, ModalModule } from '../../../mdb-components/free/index';
import { ReactiveFormsModule } from '@angular/forms';
import { SidenavModule, CardsModule } from '../../../mdb-components/pro/index';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule } from '@angular/material';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CarouselModule,
    ModalModule.forRoot(),
    SidenavModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    CardsModule,
    
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
