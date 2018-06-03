import { APP_CONSTANT } from '../../../constants/app.constants';
import { from } from 'rxjs';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DASHBOARD_CONSTANT } from '../dashboard.constant';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as firebase from 'firebase';
import { UserModel } from '../../../models/user.model';
import { AuthService } from '../../../auth.service';
import { LocalStorageService } from '../../../localstorage.service';
import { environment } from '../../../../environments/environment';
import { AlertComponent } from '../../../util/alert/alert.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @ViewChild(AlertComponent) alert: AlertComponent;
  dashboardConstant = DASHBOARD_CONSTANT;
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  public userInfo: UserModel = new UserModel();
  public screen: string;
  private confirmationResult: any;
  public otp: number;
  showSendOTPButton: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<RegistrationComponent>,
  private authService: AuthService, private localStorageService: LocalStorageService) {
    this.screen = data.screen;
  }

  ngOnInit() {
    
  }

  verifyPhoneNumber(){
    this.authService.verifyPhoneNumber(this.userInfo.phoneNumber).subscribe(
      (data)=>{ 
        console.log("User is ", data)
        if(data.exist == true){
          this.alert.errorAlert('You are already registered please login', 'ok') 
        }else{
          this.sendOTP();
        }
      },
      (error)=>{
        console.log("Error while verifying number")
        this.alert.errorAlert('Error while verifying number', 'ok')        
      }
    )
  }
 
  sendOTP() {
    this.showSendOTPButton = false;
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    const phoneNumberString = environment.COUNTRY_CODE + this.userInfo.phoneNumber.toString();
    from(firebase.auth().signInWithPhoneNumber(phoneNumberString, this.recaptchaVerifier)).subscribe(
      data=>{
        console.log("sms sent successfully ")
        this.screen = this.dashboardConstant.OTP_FORM_SCREEN;
        this.confirmationResult = data;
        this.alert.successAlert('sms sent successfully on your mobile', 'ok')
      },
      error=>{
        console.log("error while sending sms ", error)
        this.alert.errorAlert('sms sending failed Please try after some time', 'ok')
      }
    )
  };

  submitOTP(otp){
    from(this.confirmationResult.confirm(otp)).subscribe( 
      (result: firebase.auth.UserCredential) => {
      let user: firebase.User = result.user;
      from(user.getIdToken()).subscribe(
        data => {
          console.log("new token is ", data)
          this.localStorageService.set(APP_CONSTANT.LOCALSTORAGE_TOKEN_KEY, data)
          this.userInfo.uid = user.uid;
          this.registerUser(this.userInfo)
          this.alert.successAlert('Login successfully', 'ok')
        }
      )
    }, (error)=> {
      console.error("user is not loggedin")
      //this.alert.errorAlert('Error while creating Region', 'Error')
    });
  }

  registerUser(userInfo: UserModel){
    this.authService.registerUser(userInfo).subscribe(
      (data)=>{
        let encodedString = btoa(JSON.stringify(data));
        this.localStorageService.set(APP_CONSTANT.LOCALSTORAGE_USERINFO_KEY, encodedString)
        this.authService.userLoggedInEvent.emit(true)
        this.dialogRef.close()
        this.alert.successAlert('Registration successfully', 'Done');
      },
      (error)=>{
        console.log("user registration failed")
        this.alert.errorAlert('Failed registration please try aftersome time', 'ok')
      }
    )
  }
}
