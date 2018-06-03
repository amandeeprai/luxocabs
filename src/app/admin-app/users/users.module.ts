import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { Routes, RouterModule } from '@angular/router';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatTableModule, MatPaginatorModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { 
    path: '', 
    component: UsersComponent
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
    
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
