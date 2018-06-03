import { Component, OnInit, Inject } from '@angular/core';
import { StripeService, Elements, Element as StripeElement, ElementsOptions, ElementStyleAttributes } from "ngx-stripe";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stripe-element',
  templateUrl: './stripe-element.component.html',
  styleUrls: ['./stripe-element.component.scss']
})
export class StripeElementComponent implements OnInit {

  elements: Elements;
  card: StripeElement;
  cardNumber: StripeElement;
  elementsOptions: ElementsOptions = {
    locale: 'auto'
  };
 
  stripeTest: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    public dialogRef: MatDialogRef<StripeElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
 
  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card){
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#000',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          
          this.card.mount('#card-element');
        }
      });
  }
 
  buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token);
          this.dialogRef.close(result.token)
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
}
