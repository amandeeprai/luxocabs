import { Component, OnInit, ViewChild } from '@angular/core';
import { FareModel } from '../../models/fare.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AlertComponent } from '../../util/alert/alert.component';
import { AdminAppService } from '../admin-app.service';
import { environment } from '../../../environments/environment';
import { APP_CONSTANT } from '../../constants/app.constants';
import { from } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-cab-fare',
  templateUrl: './cab-fare.component.html',
  styleUrls: ['./cab-fare.component.scss']
})
export class CabFareComponent implements OnInit {

    fareModel: FareModel = new FareModel();
  
    fareTypes = [
      APP_CONSTANT.DAYFARE,
      APP_CONSTANT.OVERNIGHT_FARE,
      APP_CONSTANT.PEAK_FARE
    ];

    flagFallFare: Number;
    distanceFare: Number;
    bookingFees: Number;
    maxiTaxiFare: Number;
    premiumServiceCharge: Number;
    pickupFromAirportCharge: Number;
    gstOnElectronicPayment: Number;
    fareType: string;
  
    displayedColumns = ['_id', 'flagFallFare', 'distanceFare', 'fareType',  'operation'];
  
    dataSource: MatTableDataSource<FareModel>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    @ViewChild(AlertComponent) alert: AlertComponent;
  
    constructor(private adminAppService: AdminAppService) {
      //this.fareModel.isActive = false;    
     }
  
    ngOnInit() {
      setTimeout( ()=> {
        this.fetchAllFares();
      }, 1000)
    
    }
  
    onSubmit(){

      from(firebase.auth().currentUser.getIdToken()).subscribe(
        token=>{
          this.adminAppService.create(this.fareModel, `${environment.restFareURL}`, token).subscribe(
            data => {
              this.alert.successAlert('Fare is created', 'Done');
              this.fetchAllFares()
              this.resetFare()
            },
            error => {
              console.log(error)
              this.alert.errorAlert('Error while creating Fare', 'Error')
            }
          )
        },
        error =>{
          console.log("Error while fetching token")
        }
      )
    }
  
    fetchAllFares(){
      from(firebase.auth().currentUser.getIdToken()).subscribe(
        token=>{
          this.adminAppService.fetchAll(`${environment.restFareURL}`, token).subscribe(
            data => {
              this.dataSource = new MatTableDataSource<FareModel>(data);
              this.dataSource.paginator = this.paginator;
            },
            error => {
              console.log(error)
              this.alert.errorAlert('Error while fetching Fare', 'Error')        
            }
          )
        },
        error =>{
          console.log("Error while fetching token")
        }
      )
    }
  
    editFare(fare){
      this.fareModel = fare;
    }
    
    cancel(){
      this.resetFare()
    }
  
    updateFare(){
      from(firebase.auth().currentUser.getIdToken()).subscribe(
        token=>{
          this.adminAppService.update(this.fareModel, `${environment.restFareURL}`,token).subscribe(
            data => {
             this.alert.successAlert('Fare is updated', 'Done');
              this.fetchAllFares();
            },
            error => {
             this.alert.errorAlert('Error while updating Fare', 'Error')        
            }
          )
        },
        error =>{
          console.log("Error while fetching token")
        }
      )
    }
  
    resetFare(){
      this.fareModel = new FareModel();
    }

}
