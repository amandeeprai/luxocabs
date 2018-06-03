import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabFareComponent } from './cab-fare.component';
import { Routes, RouterModule } from '@angular/router';
import { MatSelectModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule } from "@angular/material";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { UtilModule } from '../../util/util.module';

const routes: Routes = [
  { 
    path: '', 
    component: CabFareComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    UtilModule    
  ],
  declarations: [CabFareComponent]
})
export class CabFareModule { }
