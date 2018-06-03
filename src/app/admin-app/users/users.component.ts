import { Component, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import * as firebase from 'firebase';
import { AdminAppService } from '../admin-app.service';
import { environment } from '../../../environments/environment';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { APP_CONSTANT } from '../../constants/app.constants';
import { element } from 'protractor';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  editbox:boolean= false;
  UserModel: UserModel = new UserModel();
  
     _id: string;
    uid: string;
    roles: string[];
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isUserVerified: boolean;

  constructor(private adminAppService: AdminAppService) { }
  displayedColumns = ['_id', 'pickupAddress', 'pickupDate', 'stripeToken',  'operation'];
  
  dataSource: MatTableDataSource<UserModel>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    setTimeout(() => {
      this.fetchAllUsers();
    }, 1000);
  }

  fetchAllUsers(){
    from(firebase.auth().currentUser.getIdToken()).subscribe(
      token=>{
        this.adminAppService.fetchAll(`${environment.restUserRegistration}/admin/`, token).subscribe(
          data => {
            console.log("get all users ", data )
            this.dataSource = new MatTableDataSource<UserModel>(data);
            this.dataSource.paginator = this.paginator;
          },
          error => {
            console.log(error)
          }
        )
      },
      error =>{
        
        console.log("Error while fetching token")
      }
    )
  }
  editUser(element){
    this.UserModel = element;
   this.editbox = true;
  }
  updateUser(){
    from(firebase.auth().currentUser.getIdToken()).subscribe(
      token=>{
        this.adminAppService.update(this.UserModel, `${environment.restUserRegistration}/secured/`,token).subscribe(
          data => {
          
            this.fetchAllUsers();
            this.editbox = false
          },
          error => {
            console.log('error user updateed')
          }
        )
      },
      error =>{
        console.log("Error while fetching token")
      }
    )
  }
  cancel(){
    this.resetUser()
  }

  resetUser(){
    this.UserModel = new UserModel();
    this.editbox = false
  }
}
