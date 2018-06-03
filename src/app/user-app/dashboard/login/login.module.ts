import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import {MatCardModule, MatIconModule, MatButtonModule, MatDialogModule, MatDialogTitle} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { UtilModule } from '../../../util/util.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    UtilModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  entryComponents: [LoginComponent]
})
export class LoginModule { }
