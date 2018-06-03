import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { RegistrationComponent } from '../../dashboard/registration/registration.component';
import { DASHBOARD_CONSTANT } from '../../dashboard/dashboard.constant';
import { LoginComponent } from '../../dashboard/login/login.component';
import { UserModel } from '../../../models/user.model';
import { AuthService } from '../../../auth.service';
import * as firebase from 'firebase';
import { LocalStorageService } from '../../../localstorage.service';
import { APP_CONSTANT } from '../../../constants/app.constants';
import { UserAppService } from '../../user-app.service';
import { LoaderComponent } from './../../../loader/loader.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isDisplay = "none";  
    registrationModalRef : MatDialogRef<RegistrationComponent>;
    loginModalRef : MatDialogRef<LoginComponent>;
    userInfo: UserModel = new UserModel();
    token: string;
    isLogin: boolean = false;
      user : string; 
    constructor(public dialog: MatDialog,  private authService: AuthService, private localStorageService: LocalStorageService,) { 
      this.authService.userLoggedInEvent.subscribe(
        (data)=>{
          this.userInfo = JSON.parse(atob(this.localStorageService.get(APP_CONSTANT.LOCALSTORAGE_USERINFO_KEY)));
          this.token = this.localStorageService.get(APP_CONSTANT.LOCALSTORAGE_TOKEN_KEY);
                 if(this.userInfo._id){
                  this.isLogin = true; 
                  this.user = this.userInfo.firstName;
                  
                 }
                 })
                            let data = this.localStorageService.get(APP_CONSTANT.LOCALSTORAGE_USERINFO_KEY);
                  console.log("data ", data)
                  this.userInfo = data == null ? new UserModel() : JSON.parse(atob(data));
                  this.token = this.localStorageService.get(APP_CONSTANT.LOCALSTORAGE_TOKEN_KEY);
                  if(this.userInfo._id){
                  this.isLogin = true; 
                  this.user = this.userInfo.firstName;
                  
                 }
                 
        }
  
    ngOnInit() {
    }
  
    openRegistrationModal() {
      this.registrationModalRef = this.dialog.open(RegistrationComponent, {
         height: '60%',
         panelClass: 'myapp-no-padding-dialog2',
         width: '60%',          
          data: {
            screen: DASHBOARD_CONSTANT.SIGNUP_FORM_SCREEN
          },
          //panelClass: 'my-payroll'
        });
    }

    openLoginModal() {
      this.isDisplay = "block";  
      this.loginModalRef = this.dialog.open(LoginComponent, {
         // height: '60%',
         panelClass: 'myapp-no-padding-dialog',
          width: '60%',
          data: {
            screen: DASHBOARD_CONSTANT.LOGIN_FORM_SCREEN
          },
          //panelClass: 'my-payroll'
        });
        this.isDisplay = "none";  
    }
    logout(){
      
    firebase.auth().signOut()
      this.localStorageService.remove(APP_CONSTANT.LOCALSTORAGE_TOKEN_KEY)
      this.localStorageService.remove(APP_CONSTANT.LOCALSTORAGE_USERINFO_KEY)
      this.userInfo = new UserModel()
      this.user = null
      this.token = null
      this.isLogin = false;
    }
}
