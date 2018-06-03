import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule, MatIconModule, MatCardModule, MatButtonModule, MatDialogModule, MatFormFieldModule } from '@angular/material';
import { UtilModule } from '../../util/util.module';

const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    UtilModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
