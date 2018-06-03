import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from '../../auth.service';
import { LocalStorageService } from '../../localstorage.service';
import { AlertComponent } from '../../util/alert/alert.component';
import { UserModel } from '../../models/user.model';
import * as firebase from 'firebase';
import { environment } from '../../../environments/environment';
import { APP_CONSTANT } from '../../constants/app.constants';
import { from } from 'rxjs';
import { ADMIN_APP_CONSTANT } from '../admin-app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isDisplay = "none";  
  @ViewChild(AlertComponent) alert: AlertComponent;

  adminAppConstant = ADMIN_APP_CONSTANT;

  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  public userInfo: UserModel = new UserModel();
  public screen: string;
  private confirmationResult: any;
  public otp: number;
  showSendOTPButton: boolean = true;

  constructor(private authService: AuthService, 
  private localStorageService: LocalStorageService,
  private router: Router) {
    this.screen  = this.adminAppConstant.LOGIN_FORM_SCREEN
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
          this.alert.errorAlert('You are not authorize to access Admin Panel  ', 'ERROR')
        }
      },
      (error)=>{
        this.alert.errorAlert('Error while verifying number  ', 'ERROR')
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
        this.screen = this.adminAppConstant.OTP_FORM_SCREEN;
        this.confirmationResult = data;
        this.alert.successAlert('OTP sent successfully on your mobile number', 'OK')
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
        
        if(data.roles.indexOf("ROLE_ADMIN") > -1){
          //Valid admin user. Route to admin panel
          this.router.navigateByUrl("/admin-app/dashboard/cab-fare")

        }else{
          //Invalid user.
          this.alert.errorAlert('You are not authorize to access Admin Panel  ', 'ERROR')
        }

        //this.alert.successAlert('Login successfully ', 'OK')
        
      },
      (error)=>{
        console.log("user registration failed")
        this.alert.errorAlert('registration failed ', 'ERROR')
      }
    )
  }
}
