import { from } from 'rxjs';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DASHBOARD_CONSTANT } from '../dashboard.constant';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as firebase from 'firebase';
import { UserModel } from '../../../models/user.model';
import { AuthService } from '../../../auth.service';
import { LocalStorageService } from '../../../localstorage.service';
import { APP_CONSTANT } from '../../../constants/app.constants';
import { environment } from '../../../../environments/environment';
import { AlertComponent } from '../../../util/alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isDisplay = "none";  
  @ViewChild(AlertComponent) alert: AlertComponent;
    dashboardConstant = DASHBOARD_CONSTANT;
  
    public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
    public userInfo: UserModel = new UserModel();
    public screen: string;
    private confirmationResult: any;
    public otp: number;
    showSendOTPButton: boolean = true;
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,  public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService, 
    private localStorageService: LocalStorageService) {
      this.screen = data.screen;
    }
  
    ngOnInit() {
      
    }

    verifyPhoneNumber(){
      this.isDisplay = "block";  
      this.authService.verifyPhoneNumber(this.userInfo.phoneNumber).subscribe(
        (data)=>{ 
          console.log("User is ", data)
          if(data.exist == true){
            this.sendOTP();
          }else{
            this.alert.errorAlert('your are not registrated ', 'ok')
          }
        },
        (error)=>{
          console.log("Error while verifying number")
        }
      )
      this.isDisplay = "none";  
    }
   
    sendOTP() {
      this.showSendOTPButton = false;
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      const phoneNumberString = environment.COUNTRY_CODE + this.userInfo.phoneNumber.toString();
      from(firebase.auth().signInWithPhoneNumber(phoneNumberString, this.recaptchaVerifier)).subscribe(
        data=>{
          console.log("sms sent successfully ")
          this.alert.errorAlert('OTP sent successfully on your mobile number', 'ok')
          this.screen = this.dashboardConstant.OTP_FORM_SCREEN;
          this.confirmationResult = data;
        },
        error=>{
          console.log("error while sending sms ", error)
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
              this.getUserByPhoneNumber(this.userInfo)
            }
          )
        }, (error)=> {
          console.error("user is not loggedin")
        }
      );
    }

    getUserByPhoneNumber(userInfo: UserModel){
      this.authService.getUserByPhoneNumber(userInfo.phoneNumber).subscribe(
        (data)=>{
          console.log("loggedin user is ", data)
          let encodedString = btoa(JSON.stringify(data));
          this.localStorageService.set(APP_CONSTANT.LOCALSTORAGE_USERINFO_KEY, encodedString)
          this.authService.userLoggedInEvent.emit(true)
          this.dialogRef.close()
          this.alert.errorAlert('Login successfully ', 'ok')
          
        },
        (error)=>{
          console.log("user registration failed")
          this.alert.errorAlert('registration failed ', 'ok')
        }
      )
    }

}
