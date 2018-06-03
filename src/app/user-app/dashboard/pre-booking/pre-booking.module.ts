import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreBookingComponent } from './pre-booking.component';
import { Routes } from '@angular/router';
import { MatStepperModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilModule } from '../../../util/util.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { RideInfoFormComponent } from './ride-info-form/ride-info-form.component';
import { LoaderComponent } from '../../../loader/loader.component';
import { LoaderModule } from './../../../loader/loader.module';

const routes: Routes = [
  { 
    path: '', 
    component: PreBookingComponent
  }
]

@NgModule({
  imports: [

  CommonModule,
    RouterModule.forChild(routes),
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    UtilModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressSpinnerModule,
    
  ],
  declarations: [PreBookingComponent, RideInfoFormComponent ],
  providers: []
})
export class PreBookingModule { }
