import { UserModel } from '../../../models/user.model';
import { CabFareModel } from '../../../models/cab-fare.model';
import { APP_CONSTANT } from '../../../constants/app.constants';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { RideInfoModel } from '../../../models/ride-info.model';
import { UserAppService } from '../../user-app.service';
import { environment } from '../../../../environments/environment';
import { MatStepper, MatDialogRef, MatDialog } from '@angular/material';
import { CabFaresModel } from '../../../models/cab-fares.model';
import { AuthService } from '../../../auth.service';
import { LocalStorageService } from '../../../localstorage.service';
import { BookingModel } from '../../../models/booking.model';
import { StripeElementComponent } from '../../../util/stripe-element/stripe-element.component';
import { LoaderComponent } from './../../../loader/loader.component';
import * as firebase from 'firebase';
import { from } from 'rxjs';
import { AlertComponent } from '../../../util/alert/alert.component';

@Component({
  selector: 'app-pre-booking',
  templateUrl: './pre-booking.component.html',
  styleUrls: ['./pre-booking.component.scss']
})
export class PreBookingComponent implements OnInit {
  isSame: boolean = false;
  isLinear = true;
  rideInfoForm: FormGroup;
  rideInfoFormCompleted: boolean = false;
  cabFaresModel:CabFaresModel = new CabFaresModel();

  finalCabFare: CabFareModel = new CabFareModel();
  finalRideInfo: RideInfoModel = new RideInfoModel();

  finalBooking: BookingModel = new BookingModel();
  newBooking: BookingModel = new BookingModel();

  numberOfPassengers = [1,2,3,4,5,6,7,8,9,10];
  serviceTypes = [APP_CONSTANT.FROM_AIRPORT, APP_CONSTANT.TO_AIRPORT, APP_CONSTANT.POINT_TO_POINT];

  userInfo: UserModel = new UserModel();
  token: string;

  stripeModalRef : MatDialogRef<StripeElementComponent>;

  @ViewChild(AlertComponent) alert: AlertComponent;

  @ViewChild("stepper") stepper: MatStepper;

  constructor(private userAppService: UserAppService,
    private authService: AuthService, private localStorageService: LocalStorageService,
    public dialog: MatDialog) {
      this.authService.userLoggedInEvent.subscribe(
        (data)=>{
          console.log("initialize user at booking page")
          this.userInfo = JSON.parse(atob(this.localStorageService.get(APP_CONSTANT.LOCALSTORAGE_USERINFO_KEY)));
          this.token = this.localStorageService.get(APP_CONSTANT.LOCALSTORAGE_TOKEN_KEY);
          console.log("user info is ", this.userInfo)
          console.log("new token is ", this.token)       
        },
        (error)=>{
          console.log("user is not logged in")
        }
      )
  }

  ngOnInit() {
    let data = this.localStorageService.get(APP_CONSTANT.LOCALSTORAGE_USERINFO_KEY);
    console.log("data ", data)
    this.userInfo = data == null ? new UserModel() : JSON.parse(atob(data));
    this.token = this.localStorageService.get(APP_CONSTANT.LOCALSTORAGE_TOKEN_KEY);
  }

  checkFare(event){
    console.log("event is ", event)
    this.rideInfoFormCompleted = true;
    this.userAppService.post(event, `${environment.restCalculateFareURL}`).subscribe(
      data => {
        console.log('Fare is created', 'Done');
        this.cabFaresModel = data;
        this.stepper.next();
        console.log('Next is clicked', 'Done');
      },
      error => {
        this.rideInfoFormCompleted = false;
        console.log(error)
        console.log('Error while creating Fare', 'Error')
      }
    )
  }

  selectCab(cabModel){
    console.log("this.cabFaresModel.rideInfo ", this.cabFaresModel.rideInfo)

    if(this.cabFaresModel.rideInfo.passengers > 4){
      if( 4 >= cabModel.limit ){
        this.alert.errorAlert("Please select maxicab for more than 4 passengers", "ERROR")
        return false;
      }  
    }

    console.log("selected cab ", cabModel)
    this.finalCabFare = cabModel;
    this.finalRideInfo = this.cabFaresModel.rideInfo;
    this.stepper.next();
  }

  payNow(stripeToken){
    this.createBookingObject();
    this.finalBooking.paymentMode = "Stripe";
    this.finalBooking.payStatus = "In Process";
    this.finalBooking.totalFare = (Number(this.finalBooking.totalFare) + ((this.finalBooking.gstOnElectronicPayment/100)*Number(this.finalBooking.totalFare))).toFixed(2);
    this.finalBooking.payAmount = this.finalBooking.totalFare;
    this.finalBooking.stripePaymentId = null;
    this.finalBooking.paymentDoneTime = null;
    this.finalBooking.stripeToken = stripeToken; 

    from(firebase.auth().currentUser.getIdToken()).subscribe(
      token=>{
        this.userAppService.securePost(this.finalBooking, `${environment.restBookingURL}/secured/pay-now`, token).subscribe(
          (data)=>{
            console.log("booking is successfully created ", JSON.stringify(data))
            this.newBooking = data;
            this.stepper.next();
          },
          (error) => {
            console.log("error while creating booking")
          }
        )
      },
      error =>{
        console.log("Error while fetching token")
      }
    )
  }

  payLater(){
    let token = this.localStorageService.get(APP_CONSTANT.LOCALSTORAGE_TOKEN_KEY);
    if(!token){
      this.alert.errorAlert("Please login to book cab", "ERROR")
      return;
    }
    this.createBookingObject();

    this.finalBooking.paymentMode = "Pay Driver";
    this.finalBooking.payStatus = "Pending";
    this.finalBooking.payAmount = Number(this.finalBooking.totalFare);
    this.finalBooking.stripePaymentId = null;
    this.finalBooking.paymentDoneTime = null;

    from(firebase.auth().currentUser.getIdToken()).subscribe(
      token=>{
        this.userAppService.securePost(this.finalBooking, `${environment.restBookingURL}/secured/pay-later`, token).subscribe(
          (data)=>{
            console.log("booking is successfully created ", JSON.stringify(data))
            this.newBooking = data;
            this.stepper.next();
          },
          (error) => {
            console.log("error while creating booking")
          }
        )
      },
      error =>{
        console.log("Error while fetching token")
      }
    )

    
  }

  createBookingObject(){
    this.finalBooking.flagFallFare= this.finalCabFare.flagFallFare;
    this.finalBooking.distanceFare= this.finalCabFare.distanceFare;
    this.finalBooking.bookingFees= this.finalCabFare.bookingFees;
    this.finalBooking.premiumServiceCharge= this.finalCabFare.premiumServiceCharge;
    this.finalBooking.pickupFromAirportCharge= this.finalCabFare.pickupFromAirportCharge;
    this.finalBooking.totalFare= Number(this.finalCabFare.totalFare);
    this.finalBooking.fareType= this.finalCabFare.fareType;
    this.finalBooking.gstOnElectronicPayment= this.finalCabFare.gstOnElectronicPayment;
    this.finalBooking.serviceType= this.finalCabFare.serviceType;
    this.finalBooking.limit= this.finalCabFare.limit;
    this.finalBooking.imgURL= this.finalCabFare.imgURL;
    this.finalBooking.cabName= this.finalCabFare.cabName;
    this.finalBooking.serviceFee= this.finalCabFare.serviceFee;

    this.finalBooking.pickupLatitude= this.finalRideInfo.pickupLocation.latitude;
    this.finalBooking.pickupLongitude= this.finalRideInfo.pickupLocation.longitude;
    this.finalBooking.destinationLatitude= this.finalRideInfo.destinationLocation.latitude;
    this.finalBooking.destinationLongitude= this.finalRideInfo.destinationLocation.longitude;
    this.finalBooking.pickupAddress= this.finalRideInfo.pickupAddress;
    this.finalBooking.destinationAddress= this.finalRideInfo.destinationAddress;
    this.finalBooking.passengers= this.finalRideInfo.passengers;
    this.finalBooking.pickupDate= this.finalRideInfo.pickupDate;
    this.finalBooking.pickupTime= this.finalRideInfo.pickupTime;
    this.finalBooking.totalDistance= this.finalRideInfo.totalDistance;

    this.finalBooking.userId= this.userInfo._id;
    this.finalBooking.uid= this.userInfo.uid;
    this.finalBooking.firstName= this.userInfo.firstName;
    this.finalBooking.lastName= this.userInfo.lastName;
    this.finalBooking.email= this.userInfo.email;
    this.finalBooking.phoneNumber= this.userInfo.phoneNumber;
  }

  openStripeModal() {
    let token = this.localStorageService.get(APP_CONSTANT.LOCALSTORAGE_TOKEN_KEY);
    if(!token){
      this.alert.errorAlert("Please login to book cab", "ERROR")
      return;
    }

    this.stripeModalRef = this.dialog.open(StripeElementComponent, {
       //height: '500px',
       panelClass: 'myapp-no-padding-dialog3',
               
        data: {
          userInfo: this.userInfo
        }
        //panelClass: 'my-payroll'
      });

    this.stripeModalRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("result is ", result)
      
      if(result){
        this.payNow(result.id)
        //this.stepper.next();
      }else{
        //Payment Failed
      }
    })
  }
}
