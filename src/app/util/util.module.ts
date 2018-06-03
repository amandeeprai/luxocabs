import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeElementComponent } from './stripe-element/stripe-element.component';
import { StripeCardElementComponent } from './stripe-card-element/stripe-card-element.component';
import { NgxStripeModule } from 'ngx-stripe';
import { AlertComponent } from './alert/alert.component';
import { MatSnackBarModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_gdlvLgH2sjMJqdvk37wAeevg'),
    MatSnackBarModule,
    MatDialogModule
  ],
  declarations: [StripeElementComponent, StripeCardElementComponent, AlertComponent],
  exports: [StripeElementComponent, StripeCardElementComponent, AlertComponent],
  entryComponents: [StripeElementComponent]
})
export class UtilModule { }
